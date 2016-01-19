import AppDispatcher from '../dispatchers/AppDispatcher';
import events from 'events';


const EventEmitter = events.EventEmitter;

const CHANGE_EVENT = 'change';

class VehicleStore extends EventEmitter {
    constructor() {
        super();
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
}

VehicleStore.dispatchToken = null;

export default VehicleStore;

AppDispatcher.register((action) => {
    console.log(action);
});
