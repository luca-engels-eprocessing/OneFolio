import Link from "next/link";

export default function Navbar() {


    return (
        <div className={"sticky top-0 float-right flex justify-center items-center right-8 h-screen"}>
            <div
                className="flex flex-col justify-center gap-2 items-center p-4 border border-borderLight dark:border-borderDark rounded-3xl bg-secLight dark:bg-secDark">
                <Link href={"/"} className={"border-2 px-4 py-2 transition-colors rounded-[8px] text-center w-full hover:bg-accentLight hover:border-accentBorderLight hover:text-accentTextLight text-textLight bg-primLight border-borderLight hover:dark:bg-accentDark hover:dark:border-accentBorderDark hover:dark:text-accentTextDark dark:text-textDark dark:bg-primDark dark:border-borderDark"}>
                    Home
                </Link>
                <Link href={"/add"} className={"border-2 px-4 py-2 transition-colors rounded-[8px] text-center w-full hover:bg-accentLight hover:border-accentBorderLight hover:text-accentTextLight text-textLight bg-primLight border-borderLight hover:dark:bg-accentDark hover:dark:border-accentBorderDark hover:dark:text-accentTextDark dark:text-textDark dark:bg-primDark dark:border-borderDark"}>
                    Add
                </Link>
                <Link href={"/overview"} className={"border-2 px-4 py-2 transition-colors rounded-[8px] text-center w-full hover:bg-accentLight hover:border-accentBorderLight hover:text-accentTextLight text-textLight bg-primLight border-borderLight hover:dark:bg-accentDark hover:dark:border-accentBorderDark hover:dark:text-accentTextDark dark:text-textDark dark:bg-primDark dark:border-borderDark"}>
                    Overview
                </Link>
                <Link href={"/settings"} className={"border-2 px-4 py-2 transition-colors rounded-[8px] text-center w-full hover:bg-accentLight hover:border-accentBorderLight hover:text-accentTextLight text-textLight bg-primLight border-borderLight hover:dark:bg-accentDark hover:dark:border-accentBorderDark hover:dark:text-accentTextDark dark:text-textDark dark:bg-primDark dark:border-borderDark"}>
                    Settings
                </Link>
            </div>
        </div>
    );
}
