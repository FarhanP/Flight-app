import {
    trigger,
    state,
    style,
    animate,
    transition,
    keyframes,
    group,
    animateChild,
    query
    // ...
} from '@angular/animations';

/* stylelint-disable */
export const fader = trigger('routeAnimations', [
    transition('* <=> *', [
        query(
            ':enter, :leave',
            [
                style(
                    /* stylelint-disable */{
                        position: 'absolute',
                        left: 0,
                        width: '100%',
                        opacity: 0.2,
                        transform: 'scale(0) translateY(100%)'
                    })
            ],
            { optional: true }
        ),
        query(
            ':enter',
            [
                animate(
                    '600ms ease-in',

                    style({
                        opacity: 1,
                        transform: 'scale(1) translateY(0)'
                    })
                )
            ],
            { optional: true }
        )
    ])
]);
