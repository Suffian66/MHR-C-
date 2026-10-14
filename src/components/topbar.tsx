
export default function Topbar() {
    return (
        <>
            {/* Top announcement bar */}
            <div className="bg-[#343536] px-3 py-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/80 sm:px-5 sm:tracking-[0.2em] lg:px-22">
                <div className="mx-auto flex w-full items-center justify-between">
                    <span>Renovations built around you</span>

                    <span className="hidden sm:block">
                        Serving Oakville &amp; surrounds
                    </span>
                </div>
            </div>
        </>
    );
}
