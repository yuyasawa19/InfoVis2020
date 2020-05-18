class Vec3 {
    // Constructor
    constructor(x,y,z) {
    this.x = x;
    this.y = y;
    this.z = z;
    }

    min() {
        var min = this.x;
        if (min > this.y) {
            min = this.y;
        }
        if (min > this.z) {
            min = this.z;
        }
        return min;
    }

    mid() {
        if (this.x >= this.y) {
            if (this.y >= this.z) {
                return this.y;
            } else if (this.x <= this.z) {
                return this.x;
            } else {
                return this.z;
            }
        } else if (this.x > this.z) {
            return this.x;
        } else if (this.y > this.z) {
            return this.z;
        } else {
            return this.y;
        }
    }

    max() {
        var max = this.x;
        if (max < this.y) {
            max = this.y;
        }
        if (max < this.z) {
            max = this.z;
        }
        return max;
    }

}