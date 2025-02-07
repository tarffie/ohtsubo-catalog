import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div>
      <h1>Oops! Page Not Found</h1>
      <Link href="/"> Go Back to Home </Link>
    </div>
  );
}
