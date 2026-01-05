export default function CaseDossier() {
  return (
    <section className="mt-24 space-y-16">

      {/* HEADER */}
      <div className="border border-accent/40 p-6 bg-black/60">
        <h2 className="text-xl tracking-widest text-accent">
          CASE X//0 — WITNESS X0
        </h2>
        <p className="text-sm text-accent/70 mt-2">
          STATUS: ONGOING ACTIVITY
        </p>
      </div>

      {/* PART 1 */}
      <div>
        <h3 className="mb-4 text-accent tracking-wider">
          ▌ PART 1 — CASE SUMMARY
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-accent/30 p-6 bg-black/40">
          <Field label="Case Title" value="[Descriptive title]" />
          <Field label="People Affected" value="[Estimated count]" />
          <Field label="Documented Events" value="[Total incidents]" />
          <Field label="Locations Involved" value="[Areas / Platforms]" />

          <div className="md:col-span-2">
            <p className="text-xs text-accent/60 mb-1">Summary of Situation</p>
            <p className="text-sm text-accent/90">
              Brief factual overview describing how the incidents are connected.
            </p>
          </div>

          <Field label="Current Status" value="[Ongoing / Seeking assistance]" />
        </div>
      </div>

      {/* PART 2 */}
      <div>
        <h3 className="mb-4 text-accent tracking-wider">
          ▌ PART 2 — INVOLVED INDIVIDUALS
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
        </div>
      </div>

      {/* PART 3 */}
      <div>
        <h3 className="mb-4 text-accent tracking-wider">
          ▌ PART 3 — INCIDENT LOG
        </h3>

        <div className="overflow-x-auto border border-accent/30">
          <table className="w-full text-sm">
            <thead className="bg-black/60 text-accent">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Affected Person</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Evidence Ref</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-accent/20">
              <tr>
                <td className="p-3">DD/MM/YY</td>
                <td className="p-3">Person A</td>
                <td className="p-3">Website / City</td>
                <td className="p-3">Reference #1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FOOTER NOTE */}
      <p className="text-xs text-accent/50 max-w-3xl">
        Focus on factual documentation. This structure is designed to support
        clarity, evidence organization, and reporting accuracy.
      </p>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-accent/60">{label}</p>
      <p className="text-sm text-accent/90">{value}</p>
    </div>
  );
}

function ProfileCard() {
  return (
    <div className="border border-accent/30 p-4 bg-black/40">
      <p className="text-xs text-accent/60">Identifier</p>
      <p className="text-sm text-accent/90 mb-2">[Name / Username]</p>

      <p className="text-xs text-accent/60">Role</p>
      <p className="text-sm text-accent/90 mb-2">[If known]</p>

      <p className="text-xs text-accent/60">Known Location</p>
      <p className="text-sm text-accent/90">[City, Country]</p>
    </div>
  );
}
