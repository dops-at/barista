import { NgModule } from '@angular/core';

import { DtChartModule } from '@dynatrace/barista-components/chart';

import { DtMicroChart } from './micro-chart';

@NgModule({
  imports: [DtChartModule],
  exports: [DtMicroChart],
  declarations: [DtMicroChart],
})
export class DtMicroChartModule {}