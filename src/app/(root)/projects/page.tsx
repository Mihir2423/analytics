import { EmptyProject } from "./_components/empty-project";
import { Header } from "./_components/header";
import { CreateModal } from "./_components/modal/create";
import { DeleteModal } from "./_components/modal/delete";
import { EditModal } from "./_components/modal/edit";

const ProjectsPage = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <Header />
      <div className="flex flex-1 justify-center items-center w-full h-full">
        <EmptyProject />
      </div>
      <CreateModal />
      <EditModal />
      <DeleteModal />
    </div>
  );
};

export default ProjectsPage;
