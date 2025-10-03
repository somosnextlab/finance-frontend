import { redirect } from 'next/navigation';

export default function OnboardingPage() {
  // Redirigir al primer paso del onboarding
  redirect('/onboarding/step/1');
}
