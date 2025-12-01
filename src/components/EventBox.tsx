import type { Evento } from "../types/Evento";

const MAPS_API_KEY = null;

function EventBox(event: Evento) {
    return (
        <div className="box event-box">
            <h3>{event.nombreEvento}</h3>
            <div className="gridbox-event">
                <div className="event-body">
                    <h6>
                        {event.fecha} - {event.hora}
                    </h6>
                    <h6>Tipo: {event.tipoEvento}</h6>
                    <h6>Organiza: {event.organizador}</h6>
                    <p className="event-desc">{event.descripcion}</p>
                </div>
                <div className="event-map">
                    <iframe
                        className="map-iframe"
                        loading="lazy"
                        src={
                            MAPS_API_KEY
                                ? "https://www.google.com/maps/embed/v1/place?key=" +
                                  MAPS_API_KEY +
                                  "&q=Space+Needle,Seattle+WA"
                                : "./src/assets/images/map-mockup.jpg"
                        }
                    ></iframe>
                </div>
                <button className="button w-100">Ver Mas</button>
            </div>
        </div>
    );
}

export default EventBox;
