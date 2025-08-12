import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { tag } = await req.json();
    if (!tag) return NextResponse.json({ ok: false, error: "missing tag" }, { status: 400 });
    // @ts-ignore - available in Next runtime
    await (global as any).revalidateTag?.(tag);
    return NextResponse.json({ ok: true, revalidated: tag });
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
