"use client"

import {redirect} from 'next/navigation';

type Props = {
  params: {
    type: string;
  };
};

export default function ShareRedirectPage({ params }: Props) {
  redirect(`/result?type=${params.type}`);
}