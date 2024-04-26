export default function CarDetailsPage({ params }) {
  const { unitCode } = params;
  console.log("car details:" + JSON.stringify(params));
  console.log("hello world");

  
  return (
    <main className="mx-3 my-2">
      <h1 className="text-2xl">Details For Car: {params.unitcode || 'Loading...'}</h1>
      {}
      <div className="text-sm px-4 py-2 cursor-pointer">
        {unitCode}
      </div>

      <section className="grid grid-cols-2 mt-4 gap-2">
        <div className="text-gray-800 px-4 py-2">

        </div>

      </section>
    </main>
  );
}
