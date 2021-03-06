import extractBrush from './extractBrush';
import extractOpacity from './extractOpacity';
import _ from 'lodash';
let separator = /\s*,\s*/;

const caps = {
    butt: 0,
    square: 2,
    round: 1
};

const joins = {
    miter: 0,
    bevel: 2,
    round: 1
};

export default function(props) {
    let {stroke} = props;

    let strokeWidth = +props.strokeWidth;

    if (_.isNil(props.strokeWidth)) {
        strokeWidth = null;
    }

    let strokeDasharray = props.strokeDasharray;

    if (typeof strokeDasharray === 'string') {
        strokeDasharray = strokeDasharray.split(separator).map(dash => +dash);
    }

    // strokeDasharray length must be more than 1.
    if (strokeDasharray && strokeDasharray.length === 1) {
        strokeDasharray.push(strokeDasharray[0]);
    }

    return {
        stroke: extractBrush(stroke),
        strokeOpacity: extractOpacity(props.strokeOpacity),
        strokeLinecap: caps[props.strokeLinecap] || 0,
        strokeLinejoin: joins[props.strokeLinejoin] || 0,
        strokeDasharray: strokeDasharray || null,
        strokeWidth: strokeWidth,
        strokeDashoffset: strokeDasharray ? (+props.strokeDashoffset || 0) : null,
        strokeMiterlimit: props.strokeMiterlimit || 4
    };
}
