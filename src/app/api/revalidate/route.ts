import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const { tag } = await req.json();
    if (!tag) return NextResponse.json({ ok: false, error: "missing tag" }, { status: 400 });
    await revalidateTag(tag);
    return NextResponse.json({ ok: true, revalidated: tag });
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
