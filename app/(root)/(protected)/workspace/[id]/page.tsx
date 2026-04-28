const WorkspacePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return <section>{id}</section>;
};

export default WorkspacePage;
