"use client"

import {useCreateTagMutation} from "@/shared/model/store/api/task.api";
import {useApiErrorToast} from "@/shared/model/hooks/useApiErrorToast";
import type {Tag} from "@/entities/task";
import {useAppDispatch} from "@/shared/model/store";
import {setFetchTags} from "@/shared/model/store/slices/task/task.slice";

const useCreateTag = () => {
    const dispatch = useAppDispatch();

    const [createTag, {isLoading: createTagLoading, error: createTagError}] = useCreateTagMutation();

    useApiErrorToast(createTagError);

    const handleCreateTag = async ({ name }: Pick<Tag, "name">): Promise<Tag | undefined> => {
        try {
            const response = await createTag({ name }).unwrap();

            if (response) {
                dispatch(setFetchTags(true));

                return {
                    id: response.id,
                    name
                };
            }
        } catch (e) {
            console.error(e);
        }
    }

    return {
        handleCreateTag,
        createTagLoading
    };
}

export default useCreateTag;