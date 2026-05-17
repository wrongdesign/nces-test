"use client"

import BackButton from "@/shared/ui/BackButton/BackButton";
import {TaskDetails, useGetTags} from "@/features/task";
import {TaskMode} from "@/entities/task";
import DefaultPageWrapper from "@/shared/ui/DefaultPageWrapper";
import {useAppDispatch} from "@/shared/model/store";
import {useEffect} from "react";
import {setFetchTags} from "@/shared/model/store/slices/task/task.slice";
import LoaderComponent from "@/shared/ui/LoaderComponent";

const CreateTaskPage = () => {
    const dispatch = useAppDispatch();

    const { tagsLoading } = useGetTags();

    useEffect(() => {
        dispatch(setFetchTags(true));
    }, [dispatch]);

    return(
        <DefaultPageWrapper
            backButton={<BackButton />}
            title={"Create Task"}
        >
            <TaskDetails taskMode={TaskMode.CREATE} />

            {tagsLoading && <LoaderComponent />}
        </DefaultPageWrapper>
    );
}

export default CreateTaskPage;