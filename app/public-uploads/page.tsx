import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../_components/SiteHeader";

const activityPhotos = [
  { src: "/activity-photos/photo-1.png", caption: "ลงสำรวจภาคสนาม — ตลาด" },
  { src: "/activity-photos/photo-2.png", caption: "ลงสำรวจภาคสนาม — ริมบึงแก่นนคร" },
  { src: "/activity-photos/photo-3.png", caption: "ECO SCHOOL" },
  { src: "/activity-photos/photo-4.png", caption: 'นิทรรศการ "เมืองดีย์ อะไรก็ดีย์" (Good City, Better Living)' },
  { src: "/activity-photos/photo-5.png", caption: "สัมภาษณ์เจ้าหน้าที่สำนักช่าง เทศบาลนครขอนแก่น" },
  { src: "/activity-photos/photo-6.png", caption: "ลงสำรวจภาคสนาม — ถนนและสี่แยก" },
  { src: "/activity-photos/photo-7.png", caption: "เผยแพร่โครงงาน 11 โรงเรียน" },
  { src: "/activity-photos/photo-8.png", caption: "ลงชุมชน" },
  { src: "/activity-photos/photo-9.png", caption: "สัมภาษณ์ GIS Software Developer บริษัท อินเทอร์เน็ตประเทศไทย" },
  { src: "/activity-photos/photo-10.png", caption: "สัมภาษณ์เจ้าหน้าที่กรมอุตุนิยมวิทยา" },
  { src: "/activity-photos/photo-11.png", caption: "อาจารย์และรุ่นพี่วิทยาลัยการคอมพิวเตอร์ สาขาภูมิสารสนเทศ มหาวิทยาลัยขอนแก่น" },
  { src: "/activity-photos/photo-12.png", caption: "สัมภาษณ์เจ้าหน้าที่ GISTDA ภูมิภาคตะวันออกเฉียงเหนือ" },
];

export default function PublicUploadsPage() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-6 py-16">
          <p className="text-sm text-black/40">
            <Link href="/" className="hover:underline">
              หน้าหลัก
            </Link>{" "}
            / ภาพกิจกรรมสาธารณะ
          </p>
          <h1 className="mt-4 text-3xl font-bold">ภาพกิจกรรม</h1>

          <section className="mt-8">
            <h2 className="text-xl font-semibold">ภาพกิจกรรมโครงการ</h2>
            <div className="mt-6 flex flex-col gap-8">
              {activityPhotos.map((photo) => (
                <div key={photo.src}>
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    width={1920}
                    height={1080}
                    className="w-full h-auto rounded-lg border border-black/10"
                  />
                  <p className="mt-2 text-center text-sm font-medium text-green-900">{photo.caption}</p>
                </div>
              ))}
            </div>
          </section>
        </section>
      </main>

      <footer className="border-t border-black/10">
        <div className="mx-auto max-w-5xl px-6 py-6 text-center text-xs text-black/40">
          © {new Date().getFullYear()} ภาคผนวก
        </div>
      </footer>
    </>
  );
}
