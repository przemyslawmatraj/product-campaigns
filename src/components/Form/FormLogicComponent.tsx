import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getCampaignById } from "../../api/api";
import Form from "./Form";

interface FormLogicComponentProps {
  type: "add" | "edit";
  setModalOpen: (modalOpen: boolean) => void;
  campaignId?: any;
  onFormSubmit: (data: any) => void;
}

const FormLogicComponent = ({
  type,
  setModalOpen,
  onFormSubmit,
  campaignId,
}: FormLogicComponentProps) => {
  const { id } = useParams();

  const { data: defaultValues, isLoading } = useQuery(
    ["campaigns", id, campaignId],
    () => getCampaignById(campaignId),
    {
      enabled: type === "edit",
    }
  );

  if (type === "edit" && isLoading) return <div>Loading...</div>;

  return (
    <Form
      type={type}
      setModalOpen={setModalOpen}
      onFormSubmit={onFormSubmit}
      defaultValues={defaultValues}
    />
  );
};

export default FormLogicComponent;
