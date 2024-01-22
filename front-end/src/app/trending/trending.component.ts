import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicCardService } from '../music-card/music-card.service';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css'],
})
export class TrendingComponent  {
  public chartOptions: ChartOptions;
  trendingAlbuns: any[] = [];
  constructor(private readonly musicService: MusicCardService,
    private cdr: ChangeDetectorRef
    ) {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'donut',
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }
  ngOnInit() {
    this.loadMusics();
  }
  loadMusics() {
    this.getMusics().subscribe((result) => {
      console.log(result); // Add logging here
      const sortedData = result.sort((a: any, b: any) => b.likes - a.likes);
      this.trendingAlbuns = sortedData.slice(0, 5);
      this.chartOptions.series =  this.trendingAlbuns.map(
        (music:any) => music.likes
      );
      this.chartOptions.labels =  this.trendingAlbuns.map(
        (music:any) => music.trackName
      );
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 1);
    });
  }
  getMusics() {
    return this.musicService.getAll();
  }
}
