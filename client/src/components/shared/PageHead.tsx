import { Title, Meta } from "react-head";

interface PageHeadProps {
  title: string;
  description?: string;
}

export default function PageHead({ title, description }: PageHeadProps) {
  return (
    <>
      <Title>{title}</Title>
      <Meta name="description" content={description || title} />
    </>
  );
}
