import { Component, Input } from "@angular/core";

@Component({
  selector: "page-heading",
  templateUrl: "./page-heading.component.html",
  styleUrls: ["./page-heading.component.scss"]
})
export class PageHeadingComponent {
  @Input() text: string = "No Name";
}
