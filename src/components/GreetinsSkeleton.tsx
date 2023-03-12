import Card from "./Card";

const GreetingsSkeleton = () => {
  return (
    <Card className="w-full py-14">
      <div className="flex animate-pulse space-x-4">
        <div className="h-10 w-10 rounded-full bg-gray-300" />
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 rounded bg-gray-300" />
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-2 rounded bg-gray-300" />
              <div className="col-span-1 h-2 rounded bg-gray-300" />
            </div>
            <div className="h-2 rounded bg-gray-300" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GreetingsSkeleton;
