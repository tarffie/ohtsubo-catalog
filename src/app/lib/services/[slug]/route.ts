import { NextRequest, NextResponse } from "next/server";
import {
  getServiceById,
  updateService,
  deleteService,
} from "@/lib/repository/serviceRepository";
import { Service } from "@/lib/interfaces/Service";
import { cookies } from "next/headers";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  const { slug } = params;

  if (!slug || Array.isArray(slug)) {
    return NextResponse.json({ status: 404, error: "Service not found" });
  }

  try {
    const service = await getServiceById(BigInt(slug));

    // json cannot handle bigint from id field
    const parsableService: Service = {
      ...service,
      id: slug.toString(),
    };

    return NextResponse.json({ service: parsableService }, { status: 200 });
  } catch (e) {
    const error = e as Error;
    return NextResponse.json(
      { error: `Internal server error.`, error_message: error.message },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  const updatedData = req.blob;
  console.log(updatedData);

  try {
    const updatedService = await updateService(updatedData);
    return NextResponse.json({ status: 200, updatedService });
  } catch (e) {
    return NextResponse.json({
      status: 500,
      message: "there was an error updating this service",
    });
  }
}

export async function DELETE() {
  throw new Error("TODO PERMISSIONS IMPLEMENTATION");
  const cookieFactory = await cookies();
  const id = cookieFactory.get("id")?.value;

  if (typeof id === String())
    try {
      await deleteService(id!);
      return NextResponse.json({ status: 201 });
    } catch (e) {
      return NextResponse.json(
        { error: `couldn't find service with id ${id}, ${e}` },
        { status: 500 },
      );
    }
}
