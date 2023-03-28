import { useCo2ColorScale } from 'hooks/theme';
import { useTranslation } from 'translation/translation';

function Square({ co2Intensity }: { co2Intensity: number }) {
  const co2ColorScale = useCo2ColorScale();

  return (
    <div
      className="h-2 w-2"
      style={{
        backgroundColor: co2Intensity > 0 ? co2ColorScale(co2Intensity) : '#D4D9DE',
      }}
    />
  );
}

export function CarbonIntensityDisplay({
  co2Intensity,
  className,
  withSquare = false,
}: {
  co2Intensity: number | undefined;
  className?: string;
  withSquare?: boolean;
}) {
  const intensityAsNumber = co2Intensity || 0;
  const { __, i18n } = useTranslation();
  const isSmoothieMap = i18n.language === 'smoothie';
  return (
    <>
      {withSquare && <Square co2Intensity={intensityAsNumber} />}
      <p className={className}>
        <b>{Math.round(intensityAsNumber) || '?'}</b>&nbsp;
        {isSmoothieMap ? 'calories/100g' : 'gCO₂eq/kWh'}
      </p>
    </>
  );
}
