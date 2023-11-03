"use client";
import { Separator } from "@/components/ui/separator";
import { useAppContext } from "@/context";
import { categories } from "@/data/categories";
import { formatDate, newDateAdjusted } from "@/helpers/dateFilter";
import { ArrowDownFromLine, ArrowUpFromLine, MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import ModalForm from "../../../components/Modal";
import GenericButton from "@/components/GenericButton";
import {
  findItemByParams,
  FormattedCurrency,
  handleRefValues,
} from "@/helpers/others";

export default function Record({ params }: { params: { id: string } }) {
  const { list, handleDeleteItem, handleEditItem, refs } = useAppContext();
  const router = useRouter();
  const listId = findItemByParams(list, params.id);
  if (listId === undefined) {
    return [];
  }

  return (
    <>
      <div className="container  mx-auto rounded-lg m-2">
        <div className="w-full bg-white rounded-lg p-2 flex flex-col justify-center">
          <div className="space-y-1">
            <h4
              className="text-sm text-white font-medium leading-none rounded-sm p-4"
              style={{
                backgroundColor: categories[listId?.category]?.color,
              }}
            >
              {categories[listId?.category]?.title}
            </h4>
            <p className="text-sm text-muted-foreground">{listId?.title}</p>
          </div>
          <Separator className="my-4" />
          <div className="flex h-5 items-center space-x-4 text-sm">
            <div>
              {(categories[listId?.category]?.expense && (
                <ArrowUpFromLine color="red" />
              )) || <ArrowDownFromLine color="green" />}
            </div>
            <Separator orientation="vertical" />
            <div>{FormattedCurrency(listId?.value)}</div>
            <Separator orientation="vertical" />
            <div>{formatDate(listId?.date)}</div>
          </div>

          <Separator className="my-4 text-right" />
          <div className="flex h-5 items-center justify-end space-x-2 text-sm my-2">
            <div onClick={() => router.push("/")}>
              <GenericButton tailwind="bg-blue-950">
                <MoveLeft size={21} />
              </GenericButton>
            </div>
            <Separator orientation="vertical" />

            <ModalForm
              status={
                categories[listId.category]?.expense ? "expense" : "income"
              }
              modalName={
                <div>
                  <GenericButton tailwind="bg-blue-950">EDITAR</GenericButton>
                </div>
              }
              headerTitle="EDITAR REGISTRO"
              funcActions={{
                funcTwo: () =>
                  handleEditItem(params.id, {
                    id: params.id,
                    date: newDateAdjusted(
                      (refs.dateRef.current as HTMLInputElement).value
                    ),
                    category: handleRefValues(
                      refs.categoryRef.current as HTMLInputElement
                    ) as string,
                    title: (refs.titleRef.current as HTMLInputElement).value,
                    value: parseFloat(
                      (refs.valueRef.current as HTMLInputElement).value
                    ),
                  }),
              }}
            />
            <Separator orientation="vertical" />
            <div onClick={() => handleDeleteItem(params.id)}>
              <GenericButton tailwind="bg-red-500">DELETAR</GenericButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
