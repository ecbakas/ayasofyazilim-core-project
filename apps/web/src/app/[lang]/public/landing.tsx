"use client";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@repo/ayasofyazilim-ui/atoms/button";
import { BentoGrid, BentoGridItem } from "@repo/ui/upwithcrowd/bento-grid";
import { Brands } from "@repo/ui/upwithcrowd/brands";
import { FlipWords, Hero } from "@repo/ui/upwithcrowd/hero";
import { Tabs } from "@repo/ui/upwithcrowd/tabs";
import Link from "next/link";
import { useEffect, useState } from "react";
const BrandList = [
  {
    title: "beets&roots",
    href: "https://valu.com.tr/uploads/stakeholders/stakeholder-logo-6630feda72991.webp",
  },
  {
    title: "cargaroo",
    href: "https://valu.com.tr/uploads/stakeholders/stakeholder-logo-6630ff20b3ac2.webp",
  },
  {
    title: "heeros",
    href: "https://valu.com.tr/uploads/stakeholders/stakeholder-logo-6630ff2e18167.webp",
  },
  {
    title: "tr-gov",
    href: "	https://cdn.e-devlet.gov.tr/downloads/kurumsal-kimlik/logo/e-devlet-logo.png",
  },
  {
    title: "beets&roots",
    href: "https://valu.com.tr/uploads/stakeholders/stakeholder-logo-6630feda72991.webp",
  },
  {
    title: "cargaroo",
    href: "https://valu.com.tr/uploads/stakeholders/stakeholder-logo-6630ff20b3ac2.webp",
  },
  {
    title: "heeros",
    href: "https://valu.com.tr/uploads/stakeholders/stakeholder-logo-6630ff2e18167.webp",
  },
  {
    title: "tr-gov",
    href: "	https://cdn.e-devlet.gov.tr/downloads/kurumsal-kimlik/logo/e-devlet-logo.png",
  },
];
const tabs = [
  {
    title: "Yatırımcı yol haritası",
    value: "Investor",
    content: (
      <div className="w-full overflow-hidden relative h-full  p-10 text-xl md:text-4xl font-bold text-primary bg-gradient-to-br from-slate-50 to-white shadow-2xl shadow-slate-100 flex flex-col justify-between items-center">
        <p>Yatırımcı</p>
        <div className="grid gap-12">
          <div className="flex gap-6 items-center">
            <div className="w-20 h-16 rounded-md overflow-visible relative bg-white flex items-center justify-center">
              <img
                src="https://valu.com.tr/assets/images/wm-ent-step-1.webp"
                className="w-16 h-full mt-[-30px]"
              />
            </div>
            <div className="grid gap-0 text-black">
              <h1 className="text-2xl font-bold">Kayıt ol</h1>
              <p className="text-sm font-normal">
                e-Devlet onaylı hesabınız ile kayıt işlemlerini tamamlayın.
              </p>
            </div>
          </div>
          <div className="flex gap-6 items-center">
            <div className="w-20 h-16 rounded-md overflow-visible relative bg-white flex items-center justify-center">
              <img
                src="https://valu.com.tr/assets/images/wm-inv-step-2.webp"
                className="w-16 h-full mt-[-30px]"
              />
            </div>
            <div className="grid gap-0 text-black">
              <h1 className="text-2xl font-bold">Girişim bul</h1>
              <p className="text-sm font-normal">
                Yatırım yapmak istediğiniz girişimleri belirleyin.
              </p>
            </div>
          </div>
          <div className="flex gap-6 items-center">
            <div className="w-20 h-16 rounded-md overflow-visible relative bg-white flex items-center justify-center">
              <img
                src="https://valu.com.tr/assets/images/wm-ent-step-3.webp"
                className="w-16 h-full mt-[-30px]"
              />
            </div>
            <div className="grid gap-0 text-black">
              <h1 className="text-2xl font-bold">Yatırım yap</h1>
              <p className="text-sm font-normal">
                Yatırımlarınızı Takasbank ve MKK güvencesiyle yapın.
              </p>
            </div>
          </div>
        </div>
        <Button className="w-full max-w-sm">Yatırımcı ol</Button>
      </div>
    ),
  },
  {
    title: "Girişimci yol haritası",
    value: "Entrepreneur",
    content: (
      <div className="w-full overflow-hidden relative h-full  p-10 text-xl md:text-4xl font-bold text-primary bg-gradient-to-br from-slate-50 to-white shadow-2xl shadow-slate-100 flex flex-col justify-between items-center">
        <p>Girişimci</p>
        <div className="grid gap-12">
          <div className="flex gap-6 items-center">
            <div className="w-20 h-16 rounded-md overflow-visible relative bg-white flex items-center justify-center">
              <img
                src="https://valu.com.tr/assets/images/wm-ent-step-1.webp"
                className="w-16 h-full mt-[-30px]"
              />
            </div>
            <div className="grid gap-0 text-black">
              <h1 className="text-2xl font-bold">Kayıt ol</h1>
              <p className="text-sm font-normal">
                e-Devlet onaylı hesabınız ile kayıt işlemlerini tamamlayın.
              </p>
            </div>
          </div>
          <div className="flex gap-6 items-center">
            <div className="w-20 h-16 rounded-md overflow-visible relative bg-white flex items-center justify-center">
              <img
                src="https://valu.com.tr/assets/images/wm-ent-step-2.webp"
                className="w-16 h-full mt-[-30px]"
              />
            </div>
            <div className="grid gap-0 text-black">
              <h1 className="text-2xl font-bold">Girişimci formu</h1>
              <p className="text-sm font-normal">
                Projenizi özetleyen bilgi formunu doldurun belgelerinizi
                yükleyin.
              </p>
            </div>
          </div>
          <div className="flex gap-6 items-center">
            <div className="w-20 h-16 rounded-md overflow-visible relative bg-white flex items-center justify-center">
              <img
                src="https://valu.com.tr/assets/images/wm-ent-step-3.webp"
                className="w-16 h-full mt-[-30px]"
              />
            </div>
            <div className="grid gap-0 text-black">
              <h1 className="text-2xl font-bold">Yatırım turu</h1>
              <p className="text-sm font-normal">
                Onaylama sürecinden sonra projeniz UPWITHBURSA'da listelenir.
              </p>
            </div>
          </div>
        </div>
        <Button className="w-full max-w-sm">Girişimci ol</Button>
      </div>
    ),
  },
];
const items = [
  {
    title: "Az Parayla Yatırım Yapmak (2024)",
    description: (
      <span className="text-sm w-full">
        2024 yılında artık çalışan çalışmayan, alt, orta veya üst gelir
        gruplarına mensup her sınıftan insanlar ek gelir kaynakları yaratmanın
        yollarını aramaktadır.
      </span>
    ),
    header: (
      <div className="w-full h-full flex rounded-md overflow-hidden">
        <img
          className="h-full w-auto"
          src="https://valu.com.tr/uploads/thumbcache/homepage_blog/uploads/blogs/blog-6662d10e87010.webp"
        />
      </div>
    ),
    className: "md:col-span-1",
    icon: (
      <div className="flex gap-2">
        <Badge variant={"secondary"}>Yatırım</Badge>
      </div>
    ),
  },
  {
    title: "Finans terimleri sözlüğü",
    description: (
      <span className="text-sm w-full">
        Finans dünyası, özellikle yeni başlayanlar için karmaşık gelebilecek
        terimler ve bazı yabancı kelimeler içermektedir.
      </span>
    ),
    header: (
      <div className="w-full h-full flex rounded-md overflow-hidden">
        <img
          className="h-full w-auto"
          src="https://valu.com.tr/uploads/blogs/blog-6662cf2c5b936.webp"
        />
      </div>
    ),
    className: "md:col-span-1",
    icon: (
      <div className="flex gap-2">
        <Badge variant={"secondary"}>Yatırım</Badge>
      </div>
    ),
  },
  {
    title: "Küçük Yatırımcı Neye Yatırım Yapmalı?",
    description: (
      <span className="text-sm w-full">
        Küçük yatırımcı, sınırlı yatırım sermayesine sahip olan bireyleri
        tanımlamak amacıyla kullanılan bir terimdir.
      </span>
    ),
    header: (
      <div className="w-full h-full flex rounded-md overflow-hidden">
        <img
          className="h-full w-auto"
          src="https://valu.com.tr/uploads/blogs/blog-6662cbc4f1975.webp"
        />
      </div>
    ),
    className: "md:col-span-1",
    icon: (
      <div className="flex gap-2">
        <Badge variant={"secondary"}>Yatırım</Badge>
      </div>
    ),
  },
  {
    title: "Temettü Nedir? Temettü Nasıl Hesaplanır?",
    description: (
      <span className="text-sm w-full">
        Yatırım dünyasına yeni adım atan herkesin sıklıkla karşılaştığı
        terimlerden biri olan temettü, yatırım kararlarınızı verirken dikkate
        almanız gereken oldukça önemli bir kavramdır.
      </span>
    ),
    header: (
      <div className="w-full h-full flex rounded-md overflow-hidden">
        <img
          className="h-full w-auto"
          src="https://valu.com.tr/uploads/blogs/blog-665d874515335.webp"
        />
      </div>
    ),
    className: "md:col-span-1",
    icon: (
      <div className="flex gap-2">
        <Badge variant={"secondary"}>Yatırım</Badge>
      </div>
    ),
  },
  {
    title: "Pasif Gelir Nedir? Nasıl Elde Edilir?",
    description: (
      <span className="text-sm w-full">
        Pasif gelir ne demek? Pasif gelir, zamanınızı daha özgür bir şekilde
        yönetmenizi ve finansal bağımsızlığınızı artırmanızı sağlayan, sürekli
        bir çaba gerektirmeyen gelir türüdür.
      </span>
    ),
    header: (
      <div className="w-full h-full flex rounded-md overflow-hidden">
        <img
          className="h-full w-auto"
          src="https://valu.com.tr/uploads/blogs/blog-6630fd88724bf.webp"
        />
      </div>
    ),
    className: "md:col-span-1",
    icon: (
      <div className="flex gap-2">
        <Badge variant={"secondary"}>Yatırım</Badge>
      </div>
    ),
  },
  {
    title: "Kitle Fonlaması Nedir?",
    description: (
      <span className="text-sm w-full">
        Günümüzde, yenilikçi fikirlerin ve projelerin hayata geçirilmesi için
        gereken finansal desteğe ulaşmak her zaman kolay olmayabiliyor.
        Geleneksel finansman yöntemleri bazen yeterli esnekliği ve erişimi
        sunamazken, kitle fonlama, bu boşluğu dolduran modern ve dinamik bir
        alternatif olarak öne çıkıyor.
      </span>
    ),
    header: (
      <div className="w-full h-full flex rounded-md overflow-hidden">
        <img
          className="h-full w-auto"
          src="https://valu.com.tr/uploads/blogs/blog-6630fd6b43c03.webp"
        />
      </div>
    ),
    className: "md:col-span-1",
    icon: (
      <div className="flex gap-2">
        <Badge variant={"secondary"}>Yatırım</Badge>
      </div>
    ),
  },
];

export default function Page({ config }: { config: any }): JSX.Element {
  return (
    <div className="w-full bg-white p-0 ">
      <Hero variant="hirevision" config={config} />
      <Brands brands={BrandList} />
      <div
        className={`w-full h-[200px]`}
        style={{
          backgroundImage: `url(${config.images.second})`,
        }}
      ></div>
      <div className="bg-slate-50 w-full overflow-hidden">
        <div className="container grid grid-cols-2 justify-center gap-6">
          <div className="flex flex-col gap-6 justify-center h-full">
            <h1 className="text-5xl font-bold">
              {/* <div className="text-black">
                UPWITH<span className="text-primary">{config.logo}</span>
              </div>{" "} */}
              <img src={config.logo} />
              aracılığıyla girişim şirketlerinde hisse sahibi olabilirsiniz.
            </h1>
            <p className="text-l">
              Şirketlere yatırım yapmak hiç bu kadar kolay olmamıştı. Hemen
              başlayın, şirketlere destek olun, etki yaratın.
            </p>
            <div className="flex gap-2">
              <Button variant={"outline"}>Bilgi al</Button>
              <Button>Yatırım yap</Button>
            </div>
          </div>
          <div className="h-full">
            <img
              className="max-h-[500px]"
              src="https://kapilendo-public.imgix.net/files/undefined/40740ec4-1931-44c8-8b9b-e7bcc383f732_funded_projects_invesdor_EN.png?w=1028&auto=format,compress&fit=crop&crop=right&min-h=580"
            />
          </div>
        </div>
      </div>
      <h3 className="text-5xl font-bold text-center w-full max-w-4xl mx-auto my-20 flex  items-center gap-0">
        {/* UPWITH{config.logo} ile */}
        <img src={config.logo} className="mr-4" /> ile
        <FlipWords
          words={["yatırımcı", "girişimci"]}
          className="text-black min-w-[230px]"
        />{" "}
        olabilirsiniz.
      </h3>
      <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col mx-auto w-full  items-start justify-start col-span-2 container">
        <Tabs
          contentClassName="mt-0"
          containerClassName="mt-0 justify-center"
          tabs={tabs}
          tabClassName="bg-slate-50 text-black rounded-none"
          activeTabClassName="bg-primary [&~*]:text-white rounded-none"
        />
      </div>
      <div className="bg-slate-50 mt-20 grid justify-center relative pb-60">
        <h3 className="text-5xl font-bold text-center mt-[-20px] uppercase absolute w-full z-10">
          {config.full} Blog
        </h3>
        <p className="w-full text-center mt-16 text-xl z-10">
          Gündeme ve fonlanan projelere dair bilgiler için Blog’u takip edin.
        </p>
        <BentoGrid className="container py-16 md:auto-rows-[20rem] px-0 z-10">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={cn("[&>p:text-lg]", item.className)}
              icon={item.icon}
            />
          ))}
        </BentoGrid>
        <div className="flex absolute top-60 z-0 w-full opacity-10 grayscale hidden">
          <img src={config.images.footer} className="w-full" />
        </div>
      </div>

      <div className="pt-20 w-full text-white bg-slate-900  bg-dot-slate-300/[0.2] relative flex items-center justify-center flex flex-col gap-20 overflow-hidden">
        {/* <div className="absolute pointer-events-none inset-[-50%] flex items-center justify-center dark:bg-slate-900 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div> */}
        <img
          src={config.images.footer}
          className="w-full absolute pointer-events-none z-0 opacity-20"
        />
        <div
          className={`w-full hidden h-full absolute inset-0 pointer-events-none opacity-10`}
          style={{
            backgroundImage: `url(${config.images.second})`,
          }}
        ></div>
        <div className="container flex flex-col h-full justify-center gap-20">
          <div className="mx-auto">
            {/* <div className={"tracking-widest text-2xl font-bold text-white"}>
              UPWITH
              <span className="text-primary">{config.logo}</span>
            </div> */}
            <img src={config.logo} className="mx-auto" />
          </div>
          <div className="grid grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-5 gap-6 col-span-2">
            <div className="items-center text-center lg:text-left lg:items-start flex flex-col gap-2">
              <h3 className="text-md font-bold">Kurumsal</h3>
              <div className="grid text-sm">
                <Link href="#" className="text-slate-200 hover:text-white">
                  Hakkımızda
                </Link>
                <Link href="#" className="text-slate-200 hover:text-white">
                  Platform Ortaklık Yapısı
                </Link>
                <Link href="#" className="text-slate-200 hover:text-white">
                  Blog
                </Link>
                <Link href="#" className="text-slate-200 hover:text-white">
                  S.S.S
                </Link>
                <Link href="#" className="text-slate-200 hover:text-white">
                  İletişim
                </Link>
              </div>
            </div>
            <div className="items-center text-center lg:text-left lg:items-start flex flex-col gap-2">
              <h3 className="text-md font-bold">Paydaşlarımız</h3>
              <div className="grid text-sm">
                <Link href="#" className="text-slate-200 hover:text-white">
                  Merkezi Kayıt İstanbul
                </Link>
                <Link href="#" className="text-slate-200 hover:text-white">
                  Takas İstanbul
                </Link>
                <Link href="#" className="text-slate-200 hover:text-white">
                  İstanbul Ticaret Odası
                </Link>
                <Link href="#" className="text-slate-200 hover:text-white">
                  E-Devlet
                </Link>
              </div>
            </div>
            <div className="items-center text-center lg:text-left lg:items-start flex flex-col gap-2">
              <h3 className="text-md font-bold">Yatırımcı</h3>
              <div className="grid text-sm">
                <Link href="#" className="text-slate-200 hover:text-white">
                  Nasıl Yatırım Yapılır?
                </Link>
                <Link href="#" className="text-slate-200 hover:text-white">
                  Aktif Projeler
                </Link>
                <Link href="#" className="text-slate-200 hover:text-white">
                  Tamamlanmış Projeler
                </Link>
                <Link href="#" className="text-slate-200 hover:text-white">
                  Gelecek Projeler
                </Link>
              </div>
            </div>
            <div className="items-center text-center lg:text-left lg:items-start flex flex-col gap-2">
              <h3 className="text-md font-bold">Girişimci</h3>
              <div className="grid text-sm">
                <Link href="#" className="text-slate-200 hover:text-white">
                  Nasıl Proje Oluşturulur?
                </Link>
                <Link href="#" className="text-slate-200 hover:text-white">
                  Proje Oluştur
                </Link>
                <Link href="#" className="text-slate-200 hover:text-white">
                  Gerekli Belgeler
                </Link>
              </div>
            </div>
            <div className="items-center text-center lg:text-left lg:items-start flex flex-col gap-2">
              <h3 className="text-md font-bold">Dokümantasyon</h3>
              <div className="grid text-sm">
                <Link href="#" className="text-slate-200 hover:text-white">
                  Değerlendirme Politikası
                </Link>
                <Link href="#" className="text-slate-200 hover:text-white">
                  Bilgi Güvenliği Politikası
                </Link>
                <Link href="#" className="text-slate-200 hover:text-white">
                  Çıkar Çatışması Politikası
                </Link>
                <Link href="#" className="text-slate-200 hover:text-white">
                  Kalite Politikası
                </Link>
                <Link href="#" className="text-slate-200 hover:text-white">
                  Rüşvet ve Yolsuzlukla Mücadele
                </Link>
                <Link href="#" className="text-slate-200 hover:text-white">
                  Kara Para ile Mücadele Politikası
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="md:h-10 py-4 bg-slate-800/50 text-sm w-full items-center flex z-5">
          <div className="container flex justify-between items-center flex-col gap-4 md:flex-row">
            {/* <h1>UPWITH{config.logo} 2024 Tüm hakları saklıdır.</h1> */}
            <h1>{config.full} 2024 Tüm hakları saklıdır.</h1>
            <div className="flex items-center gap-4 flex-col md:flex-row">
              <Link href="#" className="text-slate-200 hover:text-white">
                Genel Risk Bildirimi
              </Link>
              <Link href="#" className="text-slate-200 hover:text-white">
                Üyelik Sözleşmesi
              </Link>
              <Link href="#" className="text-slate-200 hover:text-white">
                KVKK Bildirimi
              </Link>
              <Link href="#" className="text-slate-200 hover:text-white">
                Kampanya Sözleşmesi
              </Link>
              <Link href="#" className="text-slate-200 hover:text-white">
                Faaliyet Raporu ve Finansal Tablolar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
