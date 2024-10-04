import { Component, OnDestroy, OnInit } from "@angular/core";
import { NbButtonModule, NbCardModule, NbIconModule, NbLayoutModule } from "@nebular/theme";

@Component({
    selector:'tool-stop-watch',
    templateUrl:'./stop-watch.component.html',
    styleUrls:['./stop-watch.component.scss'],
    standalone:true,
    imports:[NbCardModule,NbLayoutModule,NbIconModule,NbButtonModule]
})
export class StopWatchComponent implements OnInit,OnDestroy{
    private timer: any;
    public elapsedTime: number = 0; // in milliseconds
    public running: boolean = false;
    public displayTime: string = '00:00:00:000';
  
    ngOnInit(): void {
      this.updateDisplayTime();
    }
  
    ngOnDestroy(): void {
      clearInterval(this.timer);
    }
  
    start(): void {
      if (!this.running) {
        this.running = true;
        this.timer = setInterval(() => {
          this.elapsedTime += 100; // increment by 100 milliseconds
          this.updateDisplayTime();
        }, 100);
      }
    }
  
    stop(): void {
      if (this.running) {
        this.running = false;
        clearInterval(this.timer);
      }
    }
  
    reset(): void {
      this.elapsedTime = 0;
      this.updateDisplayTime();
      if (this.running) {
        this.stop();
      }
    }
  
    private updateDisplayTime(): void {
      const hours = Math.floor(this.elapsedTime / 3600000);
      const minutes = Math.floor((this.elapsedTime % 3600000) / 60000);
      const seconds = Math.floor((this.elapsedTime % 60000) / 1000);
      const milliseconds = this.elapsedTime % 1000;
  
      this.displayTime = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}:${this.padMilliseconds(milliseconds)}`;
    }
  
    private pad(value: number): string {
      return value.toString().padStart(2, '0');
    }
  
    private padMilliseconds(value: number): string {
      return value.toString().padStart(3, '0');
    }
}