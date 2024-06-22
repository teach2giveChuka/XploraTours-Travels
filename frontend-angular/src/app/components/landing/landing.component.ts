
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})

export class LandingComponent implements AfterViewInit {

  @ViewChild('navbar') navbar!: ElementRef;

  ngAfterViewInit(): void {
    this.animateContent([
      ".home .content h5",
      ".home .content h1",
      ".home .content p",
      ".home .content .search"
    ]);

    this.scrollTriggerAnimation(".travel", [
      ".travel .box1",
      ".travel .box2",
      ".travel .box3"
    ]);

    this.scrollTriggerAnimation(".feedback .container", [
      ".feedback .label",
      ".feedback .heading",
      ".feedback .paragraph"
    ]);

    this.scrollTriggerAnimation(".article", [
      ".article .label",
      ".article .heading"
    ]);

    this.swipeAnimation(".destinations", [
      ".destinations .heading",
      ".destinations .content"
    ]);

    this.swipeAnimation(".article", [
      ".article .latest-article",
      ".article .box1",
      ".article .box2",
      ".article .box3",
      ".article .box4"
    ]);

    this.galleryAnimation(".destinations .gallery", [
      ".destinations .gallery .box1",
      ".destinations .gallery .box2",
      ".destinations .gallery .box3",
      ".destinations .gallery .box4",
      ".destinations .gallery .box5"
    ]);

    this.galleryAnimation(".featured .gallery", [
      ".featured .gallery .box1",
      ".featured .gallery .box2",
      ".featured .gallery .box3",
      ".featured .gallery .box4"
    ]);

    this.galleryAnimation(".feedback .voices", [
      ".feedback .voices .box1",
      ".feedback .voices .box2",
      ".feedback .voices .box3",
      ".feedback .voices .box4",
      ".feedback .voices .box5",
      ".feedback .voices .box6"
    ]);
  }

  animateContent(selectors: string[]): void {
    selectors.forEach(selector => {
      gsap.to(selector, {
        y: 30,
        duration: 0.1,
        opacity: 1,
        delay: 0.2,
        stagger: 0.2,
        ease: "power2.out"
      });
    });
  }

  scrollTriggerAnimation(triggerSelector: string, boxSelectors: string[]): void {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: triggerSelector,
        start: "top 50%",
        end: "top 80%",
        scrub: 1
      }
    });

    boxSelectors.forEach(boxSelector => {
      timeline.to(boxSelector, {
        y: 0,
        duration: 1,
        opacity: 1
      });
    });
  }

  swipeAnimation(triggerSelector: string, boxSelectors: string[]): void {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: triggerSelector,
        start: "top 50%",
        end: "top 100%",
        scrub: 3
      }
    });

    boxSelectors.forEach(boxSelector => {
      timeline.to(boxSelector, {
        x: 0,
        duration: 1,
        opacity: 1
      });
    });
  }

  galleryAnimation(triggerSelector: string, boxSelectors: string[]): void {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: triggerSelector,
        start: "top 100%",
        end: "bottom 100%",
        scrub: 1
      }
    });

    boxSelectors.forEach(boxSelector => {
      timeline.to(boxSelector, {
        y: 0,
        opacity: 1,
        duration: 1
      });
    });
  }
}

