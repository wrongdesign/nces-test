import DefaultBlock from "@/shared/ui/DefaultBlock";
import {TaskList} from "@/features/task";

const DashboardPage = () => {
    return(
        <DefaultBlock customClassName="w-full!">
            <TaskList />
        </DefaultBlock>
    );
}

export default DashboardPage;