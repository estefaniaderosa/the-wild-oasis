"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
    //con searchParams iniamos el hook? si hacemos un console log searchParams.toString() nos va a dar "capacity=medium" por ejemplo
    //mas abajo vamos a usar .get para acceder al valor que tiene si no hay los va a setear a all
    //el paso que no me queda muy claro es el de params = new URLSearchParams que le pasa searchparams o sea "capacity=medium" 
    // y mas abajo usa .set para setearlo con el valor de filter.
    const searchParams=useSearchParams();
    //para navegar imperativamente OK
    const router= useRouter();
    //con usePathname agarro los paths tipo /account/blabla, lo necesito para armar la ruta para que con router me navegue ahi automaticamente OK
    const pathname= usePathname();

    const activeFilter= searchParams.get("capacity") ?? "all";

	const handleFilter = (filter) => {
        //este paso es automatico mao hay que hacerlo por la tecnica
        const params = new URLSearchParams(searchParams);
        //seteamos la url pero se setea y no se redirige, solo se setea, estamos creando un parametro en la url tipo capacity=small
        params.set("capacity", filter);
        //se redirige imperativamente con router, remplazando la route, armandola como vemos con el path el  ? y los params como los armamos, el scroll false es para que se refresque en el mismo lugar y no nos demos cuenta
        router.replace(`${pathname}?${params.toString()}`, {scroll:false})
	};

    //DIFERENCIAR PATHNAME QUE ES LAS RUTITAS DE LA URL TIPO /ACCOUNT /CABIN, de PARAMS que son tipo ?capacity=small 

  
    console.log("searchParams",searchParams.toString())
	return (
		<div className='border border-primary-800 flex'>
			<Button
				filter='all'
				handleFilter={handleFilter}
				activeFilter={activeFilter}>
				All cabins
			</Button>

			<Button
				filter='small'
				handleFilter={handleFilter}
				activeFilter={activeFilter}>
				1&mdash;3 guests
			</Button>

			<Button
				filter='medium'
				handleFilter={handleFilter}
				activeFilter={activeFilter}>
				4&mdash;7 guests
			</Button>

			<Button
				filter='large'
				handleFilter={handleFilter}
				activeFilter={activeFilter}>
				8&mdash;12 guests
			</Button>
		</div>
	);
}

function Button({ children, handleFilter, filter, activeFilter }) {
	return (
		<button
			className={`px-5 py-2 hover:bg-primary-700 ${
				filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
			}`}
			onClick={() => handleFilter(filter)}>
			{children}
		</button>
	);
}

export default Filter;
