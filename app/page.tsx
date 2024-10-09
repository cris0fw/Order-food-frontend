import Hero from "./components/layouts/Hero";
import HomeMenu from "./components/layouts/HomeMenu";
import SectionsHeaders from "./components/layouts/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about">
        <SectionsHeaders subHeader="Our story" mainHeader="About us" />

        <div className="text-gray-500 max-w-2xl mx-auto mt-4 flex flex-col gap-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Repudiandae, dolores dolor in quibusdam dicta ea rerum quis atque
            placeat aspernatur! A at excepturi et eligendi aut! Explicabo saepe
            distinctio dolores!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            repellendus iure animi doloribus eveniet odio nihil totam veritatis
            velit. Consectetur at velit molestias doloremque facere totam nemo
            architecto laudantium eos.
          </p>
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <SectionsHeaders subHeader="Don't hesitate" mainHeader="Contact Us" />
        <div className="mt-8">
          <a
            href="+39 823 435 766"
            className="text-4xl underline text-gray-500"
          >
            +39 823 435 766"
          </a>
        </div>
      </section>
    </>
  );
}
