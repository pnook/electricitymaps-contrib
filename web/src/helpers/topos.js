import { merge } from 'topojson';
import topov1 from '../world.json';
import topov2 from '../world-aggregated.json';
import { aggregatedViewFFEnabled } from './feature-flags';

const constructTopos = () => {
  const zones = {};
  const topo = aggregatedViewFFEnabled() ? topov2 : topov1;

  Object.keys(topo.objects).forEach((k) => {
    if (!topo.objects[k].arcs) {
      return;
    }
    const geo = {
      geometry: merge(topo, [topo.objects[k]]),
      properties: topo.objects[k].properties,
    };
    // Exclude zones with null geometries.
    if (geo.geometry) {
      zones[k] = geo;
    }
  });

  return zones;
};

export default constructTopos;
