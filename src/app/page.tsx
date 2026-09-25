import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-bold text-slate-950">
            L
          </div>
          <span className="text-xl font-semibold">LOOP</span>
        </div>

        <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <Link href="#features" className="hover:text-white">
            Features
          </Link>
          <Link href="#how-it-works" className="hover:text-white">
            How it works
          </Link>
          <Link href="/dashboard" className="hover:text-white">
            Dashboard
          </Link>
        </div>

        <Link
          href="/dashboard"
          className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
        >
          Open Dashboard
        </Link>
      </nav>

      <section className="mx-auto max-w-7xl px-6 pb-24 pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300">
            AI-powered customer feedback intelligence
          </div>

          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
            Turn customer feedback into
            <span className="block text-slate-400">
              actionable insights.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            LOOP helps teams understand customer sentiment, identify recurring
            issues, and make better product decisions with AI-powered insights.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className="rounded-xl bg-white px-6 py-3 font-medium text-slate-950 transition hover:bg-slate-200"
            >
              Explore Dashboard
            </Link>

            <Link
              href="#features"
              className="rounded-xl border border-slate-700 px-6 py-3 font-medium text-white transition hover:bg-slate-900"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div
          id="features"
          className="mt-24 grid gap-6 md:grid-cols-3"
        >
          <Feature
            title="Understand"
            description="Analyze customer feedback and discover what customers really think."
          />

          <Feature
            title="Discover"
            description="Identify recurring issues, trends, and opportunities automatically."
          />

          <Feature
            title="Improve"
            description="Turn insights into clear actions your team can use to improve products."
          />
        </div>
      </section>
    </main>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-7">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-3 leading-7 text-slate-400">{description}</p>
    </div>
  );
}