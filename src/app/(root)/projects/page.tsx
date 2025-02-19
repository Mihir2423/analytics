import { EmptyProject } from "./_components/empty-project";
import { Header } from "./_components/header";
import { CreateModal } from "./_components/modal/create";
import { DeleteModal } from "./_components/modal/delete";
import { EditModal } from "./_components/modal/edit";
import { ProjectCard } from "./_components/project-card";

const ProjectsPage = () => {
  const projects = [1, 2, 3];
  return (
    <div className="flex flex-col w-full h-full">
      <Header />
      {projects.length > 0 ? (
        <div className="flex flex-1 p-3 w-full h-full">
          <div className="gap-6 grid grid-cols-4 w-full">
            {projects.map((_, index) => (
              <ProjectCard key={index} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-1 justify-center items-center w-full h-full">
          <EmptyProject />
        </div>
      )}
      <CreateModal />
      <EditModal />
      <DeleteModal />
    </div>
  );
};

export default ProjectsPage;
