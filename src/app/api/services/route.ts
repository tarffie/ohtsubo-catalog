import { getServices, createService } from "@/lib/repository/serviceRepository";
import { mapToService } from "@/lib/utils/map";
import { Service } from "@/lib/types";
import { ServiceSchema } from "@/lib/entities/Service";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const services = await getServices();
    if (!services) {
      return NextResponse.json(
        { success: false, error: "Not found", status: 404 },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, services, status: 200 });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: "Request couldn't be completed", status: 500 },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const serviceInput = ServiceSchema.parse(req.body);

    const service: Service = mapToService({
      id: serviceInput.id || "",
      title: serviceInput.title,
      description: serviceInput.description || "",
      price: serviceInput.price,
    });

    await createService(service);
    return NextResponse.json({ body: service, status: 201 });
  } catch (e) {
    const error = e as Error;
    throw new Error(error.message);
  }
}
