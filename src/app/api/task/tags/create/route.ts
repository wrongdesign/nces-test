import type {Tag} from "@/entities/task";
import {readFile, writeFile} from "@/app/api/task/utils/common";
import {type NextRequest, NextResponse} from "next/server";
import {INTERNAL_ERROR} from "@/app/api/config/common";
import {validateAccessToken} from "@/app/api/task/utils/auth";

export async function POST(request: NextRequest) {
    try {
        const authError = validateAccessToken(request);

        if (authError) {
            return authError;
        }

        const { name }: Pick<Tag, "name"> = await request.json();

        const id = crypto.randomUUID();

        const newTag: Tag = {
            id: id,
            name,
        }

        const mockTags: Tag[] = readFile("src/app/api/task/mocks/tags.json");

        const newTagsList: Tag[] = [...mockTags, newTag];

        writeFile("src/app/api/task/mocks/tags.json", newTagsList);

        return new NextResponse(null,
            {
                status: 204,
            }
        );
    } catch (error) {
        console.error("[CREATE_TAG]", error)

        return INTERNAL_ERROR(error)
    }
}