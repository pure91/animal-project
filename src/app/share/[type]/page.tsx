"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";

/** redirect용 클라이언트 컴포넌트 */
export default function ShareRedirectPage({ params }: { params: { type: string } }) {
  const router = useRouter();

  useEffect(() => {
    router.push(`/result?type=${params.type}`);
  }, [params.type, router]);

  return null;
}
