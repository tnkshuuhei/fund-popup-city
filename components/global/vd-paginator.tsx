"use client";
import { buttonVariants } from "@/components/ui/button";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react";

interface IShowingDisplay {
	currentPage: number;
	totalItemAmount: number;
	itemsPerPage: number;
}

interface IVDPaginator {
	needsPagination: boolean;
	currentPage: number;
	maxPage: number;
	loadPage: (pageNum: number) => void;
}

const VDPaginator = ({
	needsPagination,
	currentPage,
	maxPage,
	loadPage,
}: IVDPaginator) => {
	if (!needsPagination) {
		return null;
	}

	return (
		<div className="flex flex-col items-center space-y-2">
			<p className="text-muted-foreground text-sm">
				Page {currentPage} of {maxPage}
			</p>

			<Pagination>
				<PaginationContent className="gap-2">
					<PaginationItem>
						<button
							onClick={() => loadPage(1)}
							className={cn(
								buttonVariants({ variant: "outline", size: "icon" }),
								"h-8 w-8",
								currentPage === 1 ? "pointer-events-none opacity-50" : "",
							)}
							disabled={currentPage === 1}
							aria-label="Go to first page"
						>
							<ChevronsLeft className="h-4 w-4" />
						</button>
					</PaginationItem>

					<PaginationItem>
						<button
							onClick={() => loadPage(currentPage - 1)}
							className={cn(
								buttonVariants({ variant: "outline", size: "icon" }),
								"h-8 w-8",
								currentPage === 1 ? "pointer-events-none opacity-50" : "",
							)}
							disabled={currentPage === 1}
							aria-label="Go to previous page"
						>
							<ChevronLeft className="h-4 w-4" />
						</button>
					</PaginationItem>

					<PaginationItem>
						<button
							onClick={() => loadPage(currentPage + 1)}
							className={cn(
								buttonVariants({ variant: "outline", size: "icon" }),
								"h-8 w-8",
								currentPage === maxPage ? "pointer-events-none opacity-50" : "",
							)}
							disabled={currentPage === maxPage}
							aria-label="Go to next page"
						>
							<ChevronRight className="h-4 w-4" />
						</button>
					</PaginationItem>

					<PaginationItem>
						<button
							onClick={() => loadPage(maxPage)}
							className={cn(
								buttonVariants({ variant: "outline", size: "icon" }),
								"h-8 w-8",
								currentPage === maxPage ? "pointer-events-none opacity-50" : "",
							)}
							disabled={currentPage === maxPage}
							aria-label="Go to last page"
						>
							<ChevronsRight className="h-4 w-4" />
						</button>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
};

const ShowingDisplay = ({
	currentPage,
	totalItemAmount,
	itemsPerPage,
}: IShowingDisplay) => {
	if (totalItemAmount === 0) {
		return null;
	}
	if (totalItemAmount === 1) {
		return <p className="text-muted-foreground text-sm">Showing 1 item</p>;
	}
	const start = (currentPage - 1) * itemsPerPage + 1;
	const end = Math.min(currentPage * itemsPerPage, totalItemAmount);

	return (
		<p className="text-muted-foreground text-sm">
			Showing {start} - {end} of {totalItemAmount} items
		</p>
	);
};

export { ShowingDisplay, VDPaginator };
