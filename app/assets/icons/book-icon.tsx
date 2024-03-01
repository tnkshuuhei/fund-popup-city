import { cn } from "@/lib/utils/misc";
import * as React from "react";

const BookIcon = React.forwardRef<
	HTMLOrSVGElement,
	React.HTMLAttributes<HTMLOrSVGElement>
>(({ className, ...props }, ref) => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={cn("h-6 md:h-10", className)}
		{...props}
	>
		<path
			d="M18 2.75V3H7.25V2.5H18V2.75ZM6.25 2.55575V3.07247C5.68555 3.24046 5.24046 3.68555 5.07247 4.25H4.55575C4.74663 3.40881 5.40881 2.74663 6.25 2.55575ZM4.5 5.25H5V16.1273C4.82029 16.2527 4.6529 16.3945 4.5 16.5505V5.25ZM6.25 21.3856C5.47248 21.1414 4.85865 20.5275 4.61445 19.75H5.07246C5.24045 20.3145 5.68555 20.7596 6.25 20.9275V21.3856ZM7.5 21.5V21H9.5V21.5H7.5ZM10.5 21.5V21H18V21.25V21.5H10.5ZM19.25 20H19V18H19.25H19.5V20H19.25ZM19.5 12.5V15.5H19.25H19V12.5H19.5ZM19.5 4V11.5H19V4H19.25H19.5ZM7.5 16.5H18V16.75V17H7.5V16.5ZM6.5 17.063C6.32261 17.1087 6.15475 17.178 6 17.2676V16.708C6.15875 16.6387 6.3261 16.5853 6.5 16.55V17.063ZM4.55001 18.5C4.62502 18.1304 4.78154 17.7905 5 17.4997V18.5H4.55001ZM9.25 7.25V6.75H14.75V7.25H9.25ZM9.25 11.25V10.75H11.75V11.25H9.25Z"
			fill="current"
			stroke="current"
		/>
	</svg>
));
export default BookIcon;
