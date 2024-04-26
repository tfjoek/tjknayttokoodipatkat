// Heres some code that i made but didnt work or didnt fit or something

// Unique check
export const getAllUniqueCarChecks = async (): Promise<ClientCompletedCheck[]> => {
  try {
    Log.info("getAllUniqueCarChecks");

    const allChecksSnapshot = await db.checkCollection.select('signature.unitCode').get();
    const allCars = allChecksSnapshot.docs.map(doc => doc.data() as unknown as ClientCompletedCheck);

    const uniqueCars = new Map<string, ClientCompletedCheck>();
    allCars.forEach(car => {
      const unitCode = car.signature.unitCode;
      uniqueCars.set(unitCode, uniqueCars.get(unitCode) || car);
    });

    const uniqueCarsArray = Array.from(uniqueCars.values());
    Log.info(`FOUND ${uniqueCarsArray.length} UNIQUE CARS.`);
    return uniqueCarsArray;
  } catch (error) {
    Log.error('Error fetching unique car checks:', error); // Fake error ? 
    throw error; // error 
  }
};


export const getAllUniqueCarChecks = async (): Promise<ClientCompletedCheck[]> => {
  Log.info("getAllUniqueCarChecks");

  const allChecksSnapshot = await db.checkCollection.get();
  const allCars = allChecksSnapshot.docs.map(doc => doc.data() as ClientCompletedCheck);

  const uniqueCars = new Map<string, ClientCompletedCheck>();
  allCars.forEach(car => {
    const unitCode = car.signature.unitCode;
    if (!uniqueCars.has(unitCode)) {
      uniqueCars.set(unitCode, car);
    }
  });

  // Log the count of unique cars found
  Log.info(`Found ${uniqueCars.size} unique cars.`);

  return Array.from(uniqueCars.values());
};

