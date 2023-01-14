import { style, animate, trigger, transition } from '@angular/animations';

export const enterLeaveTrigger = trigger('enterLeave', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.97)' }),
    animate('250ms ease-out')
  ]),
  transition(':leave', [
    animate(50, style({ opacity: 0 }))
  ])
])
