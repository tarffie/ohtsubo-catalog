import { getServices, createService } from "@/lib/repository/serviceRepository";
import { mapToService } from "@/lib/utils/map";
import { Service } from "@/lib/interfaces/Service";
import { ServiceSchema } from "@/lib/entities/Service";

import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const services = await getServices();
    return NextResponse.json({ body: services, status: 200 });
  } catch (e) {
    return NextResponse.json({ body: e, status: 404 });
  }
}

export async function POST(req: Request) {
  try {
    const serviceInput = ServiceSchema.parse(req.body);

    const service: Service = mapToService({
      id: serviceInput.id || "",
      title: serviceInput.title,
      description: serviceInput.description || "",
      price: serviceInput.price,
    });

    await createService(service);
    NextResponse.json({ body: service, status: 201 });
  } catch (e) {
    const error = e as Error;
    throw new Error(error.message);
  }
}
