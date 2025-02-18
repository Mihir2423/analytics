import { EmptyProject } from "./_components/empty-project";

const ProjectsPage = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <h1>HEader</h1>
      <div className="flex-1 w-full h-full">
        <EmptyProject />
      </div>
    </div>
  );
};

export default ProjectsPage;
