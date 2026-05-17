import TaskDetailsPageContent from "@/app/(home)/task/[id]/TaskDetailsPageContent";

const TaskDetailsPage = async ({ params }: { params: Promise<{ id: string }>; }) => {
    const { id } = await params;

    return(
        <TaskDetailsPageContent id={id} />
    );
}

export default TaskDetailsPage;