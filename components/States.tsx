import RestScene from "@/components/scenes/RestScene";
import { otterStatesSection } from "@/lib/content";

export default function States() {
  return (
    <section id="states">
      <div className="wrap">
        <div className="secHead">
          <p className="eyebrow">{otterStatesSection.eyebrow}</p>
          <h2 style={{ whiteSpace: "pre-line" }}>{otterStatesSection.heading}</h2>
          <p>{otterStatesSection.lead}</p>
        </div>
        <RestScene />
      </div>
    </section>
  );
}
