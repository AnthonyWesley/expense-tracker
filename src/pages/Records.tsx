import { RecordList } from "../components/home/RecordList";

export default function Records() {
  return (
    <div className="flex flex-col gap-2 lg:my-14 my-16 items-center ">
      <RecordList className="h-5/6" />
      {/* <Expenses /> */}
    </div>
  );
}
