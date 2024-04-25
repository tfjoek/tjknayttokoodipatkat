"server-only";

import { DateTimeUtil, DateTime } from "@/utils/dateTime";
import { CHECK_TIMESTAMP } from "./fieldValues";
import { db } from "../firebase";
import { TimedSummary } from "../type/summary/timedSummary";
import { Log } from "@/utils/logger";
import { ClientCompletedCheck, ClientStatefulItem } from "../type/public/dto";

export const getCompletedCheckCount = async (
  startTime: DateTime,
  endTime: DateTime
): Promise<number> => {
  Log.info("getCompletedCheckCount");

  const result = await db.checkCollection
    .where(CHECK_TIMESTAMP, ">=", DateTimeUtil.startOfDayUnix(startTime))
    .where(CHECK_TIMESTAMP, "<=", DateTimeUtil.endOfDayUnix(endTime))
    .count()
    .get();

  return result.data().count;
};

export const getCheckSummary = async (startTime: DateTime, endTime: DateTime): Promise<TimedSummary> => {
  Log.info("getCheckSummary");

  const result = await db.checkCollection
    .where(CHECK_TIMESTAMP, ">=", DateTimeUtil.startOfDayUnix(startTime))
    .where(CHECK_TIMESTAMP, "<=", DateTimeUtil.endOfDayUnix(endTime))
    .get();
  const checkCount = result.docs.length;
  let exceptionCount = 0;

  const checkInfos = result.docs.map((it) => {
    const checkInfo = it.data();
    if (checkInfo.summary.exceptions) {
      exceptionCount++;
    }
    return checkInfo;
  });
  

  checkInfos.sort((a, b) => b.unix - a.unix);

  const summary: TimedSummary = {
    startTime: DateTimeUtil.startOfDay(startTime),
    endTime: DateTimeUtil.endOfDay(endTime),
    totalChecksCompleted: checkCount,
    checksWithoutExceptions: checkCount - exceptionCount,
    checksWithExceptions: exceptionCount,
    checkInfos,
  };

  return summary;
};

export const getCompletedCheck = async (
  id: string
): Promise<ClientCompletedCheck> => {
  Log.info("getCompletedCheck");

  const check = (await db.checkCollection.doc(id).get()).data()!!;
  const checklist = (
    await db.checkListCollection.doc(check.listId).get()
  ).data()!!;
  const listcontent = (
    await db.checkListContentDocument(checklist.id).get()
  ).data()!!;
  const checkcontent = (await db.checkContentCollection.doc(id).get()).data()!!;
  const listitems = (
    await db.listItemCollection.doc(checklist.id).get()
  ).data()!!;

  const data: ClientCompletedCheck = {
    id: check.id,
    signature: check.signature,
    summary: check.summary,
    unix: check.unix,
    checklist: {
      id: checklist.id,
      name: checklist.name,
      description: checklist.description,
      type: checklist.type,
      domain: checklist.domain,
      createdAt: checklist.createdAt,
    },
    content: listcontent.items.map((it) => {
      return {
        title: it.title,
        items: it.ids.list.map((itemId) => {
          const state = Object.entries(checkcontent.states).find(
            (itemState) => itemState[0] === itemId
          )?.[1]!!;
          const item = listitems.items.find((item) => item.id === itemId)!!;
          const data: ClientStatefulItem = {
            id: item.id,
            name: item.name,
            amount: item.amount,
            abbr: item.abbr,
            state: state, // Ts error here, this is correct
          };
          return data;
        }),
      };
    }),
  };

  return data;
};
