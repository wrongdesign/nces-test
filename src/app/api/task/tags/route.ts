import {NextResponse} from "next/server";
import {INTERNAL_ERROR} from "@/app/api/config/common";
import {readFile} from "@/app/api/task/utils/common";
import type {Task} from "@/entities/task";

export async function GET() {
    try {
        const mockTags: Task[] = readFile("src/app/api/task/mocks/tags.json");

        return NextResponse.json(mockTags)
    } catch (error) {
        console.error("[GET_TAGS]", error)

        return INTERNAL_ERROR(error)
    }
}