import React, { useEffect, useState } from 'react';
import dynamic from "next/dynamic";
import { getCheckSummary } from "@/lib/data/checks";
import { DateTimeUtil } from "@/utils/dateTime";
import { SummaryUtil } from "./../../../lib/type/summary/summaryUtil";
import { CheckListItemList } from "@/app/components/check/checkListItemList";
import Link from "next/link";

const CheckLineChart = dynamic(
  () => import("@/app/components/chart/checkLineChart"),
  {
    ssr: false,
  }
);

const CheckPieChart = dynamic(
  () => import("@/app/components/chart/checkPieChart"),
  {
    ssr: false,
  }
);

export default async function Dashboard() {
  const checksPastTwoWeeks = await getCheckSummary(
    DateTimeUtil.subtractDays(DateTimeUtil.now(), 13),
    DateTimeUtil.now()
  );

  const firstSix = checksPastTwoWeeks.checkInfos.slice(0, 6);

  return (
    <main className="flex-col">
      {/* Two week card */}
      <div className="flex-col items-center bg-white rounded-lg shadow p-4 md:p-6">
        <h2 className="text-2xl font-light">Past two weeks</h2>
        <div className="grid grid-rows-2 lg:grid-rows-1 grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="md:col-span-1 lg:col-span-2">
            <CheckLineChart
              title={checksPastTwoWeeks.totalChecksCompleted.toString()}
              description="Checks completed"
              checks={SummaryUtil.getByDates(checksPastTwoWeeks)}
            />
          </div>
          <div className="flex">
            <CheckPieChart
              series={[
                checksPastTwoWeeks.checksWithExceptions,
                checksPastTwoWeeks.checksWithoutExceptions,
              ]}
              labels={["Exceptions", "No exceptions"]}
              title={checksPastTwoWeeks.checksWithExceptions.toString()}
              description="Checks had at least one exception"
            />
          </div>
        </div>

        <div className="flex-col mx-2">
          <div>
            <h3 className="text-lg font-light pb-1">
              Recents
              <Link
                href="/console/checks"
                className="text-sm font-medium ml-5 text-blue-500"
              >
                More{" >>"}
              </Link>
            </h3>
          </div>
          <ul className="space-y-1 p-3">
            {firstSix.map((it) => (
              <CheckListItemList key={it.id} info={it} />
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
