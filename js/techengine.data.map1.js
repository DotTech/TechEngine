TechEngine.log("Loading 'techengine.data.map1.js'...", true);

/*
//  Setup game map TechEngine.Data.map[0]
*/
(function ()
{
    var data = TechEngine.Data,
        map = data.map(),
        wallSide = data.wallside(0, 0, 0, false);
    
    map.playerStart.x = 300;
    map.playerStart.y = 300;
    map.playerStart.z = 0;
    map.playerStart.angle = 290;
    
    map.background.src = "img/sky.jpg";
    
    map.sectors = [
        data.sector(0, 128, 0, 0),
        data.sector(32, 176, 0, 0),
        data.sector(32, 128, 0, 0)
    ];
    
    map.sectors[0].vertices = [
        data.vertex(200, 300),  // 0
        data.vertex(300, 200),  // 1
        data.vertex(700, 200),  // 2
        data.vertex(800, 300),  // 3
        data.vertex(800, 600),  // 4
        data.vertex(700, 700),  // 5
        data.vertex(300, 700),  // 6
        data.vertex(200, 600)   // 7
    ];
    
    map.sectors[0].walls = [
        data.wall(0, 1, false, wallSide, wallSide),
        data.wall(1, 2, false, wallSide, wallSide),
        data.wall(2, 3, false, wallSide, wallSide),
        data.wall(3, 4, true, wallSide, wallSide),
        data.wall(4, 5, false, wallSide, wallSide),
        data.wall(5, 6, false, wallSide, wallSide),
        data.wall(6, 7, false, wallSide, wallSide),
        data.wall(7, 0, false, wallSide, wallSide)
    ];
    
    map.sectors[0].childsectors = [
        data.sector(32, 96, 0, 0),
    ];
    
        map.sectors[0].childsectors[0].vertices = [
            data.vertex(536, 500),  // 0
            data.vertex(600, 500),  // 1
            data.vertex(600, 564),  // 2
            data.vertex(536, 564),  // 3
            data.vertex(500, 532)   // 4
        ];
        
        map.sectors[0].childsectors[0].walls = [
            data.wall(0, 1, false, wallSide, wallSide),
            data.wall(1, 2, false, wallSide, wallSide),
            data.wall(2, 3, false, wallSide, wallSide),
            data.wall(3, 4, false, wallSide, wallSide),
            data.wall(4, 0, false, wallSide, wallSide)
        ];
    
    map.sectors[1].vertices = [
        data.vertex(800, 300),  // 0
        data.vertex(1100, 200), // 1
        data.vertex(1200, 100), // 2
        data.vertex(1500, 100), // 3
        data.vertex(1600, 200), // 4
        data.vertex(1700, 400), // 5
        data.vertex(1700, 500), // 6
        data.vertex(1600, 700), // 7
        data.vertex(1400, 800), // 8
        data.vertex(1200, 800), // 9
        data.vertex(1100, 700), // 10
        data.vertex(800, 600)   // 11
    ];
    
    map.sectors[1].walls = [
        data.wall(0, 1, false, wallSide, wallSide),
        data.wall(1, 2, false, wallSide, wallSide),
        data.wall(2, 3, false, wallSide, wallSide),
        data.wall(3, 4, false, wallSide, wallSide),
        data.wall(4, 5, false, wallSide, wallSide),
        data.wall(5, 6, false, wallSide, wallSide),
        data.wall(6, 7, false, wallSide, wallSide),
        data.wall(7, 8, true, wallSide, wallSide),
        data.wall(8, 9, false, wallSide, wallSide),
        data.wall(9, 10, false, wallSide, wallSide),
        data.wall(10, 11, false, wallSide, wallSide),
        data.wall(11, 0, true, wallSide, wallSide)
    ];
    
    map.sectors[1].childsectors = [
        data.sector(176, 176, 0, 0),
        data.sector(50, 176, 0, 0)
    ];
    
        map.sectors[1].childsectors[0].vertices = [
            data.vertex(1300, 200),  // 0
            data.vertex(1400, 200),  // 1
            data.vertex(1400, 300),  // 2
            data.vertex(1300, 300)   // 3
        ];
        
        map.sectors[1].childsectors[0].walls = [
            data.wall(0, 1, false, wallSide, wallSide),
            data.wall(1, 2, false, wallSide, wallSide),
            data.wall(2, 3, false, wallSide, wallSide),
            data.wall(3, 0, false, wallSide, wallSide),
        ];
        
        map.sectors[1].childsectors[1].vertices = [
            data.vertex(1500, 450),  // 0
            data.vertex(1600, 450),  // 1
            data.vertex(1600, 550),  // 2
            data.vertex(1500, 550)   // 3
        ];
        
        map.sectors[1].childsectors[1].walls = [
            data.wall(0, 1, false, wallSide, wallSide),
            data.wall(1, 2, false, wallSide, wallSide),
            data.wall(2, 3, false, wallSide, wallSide),
            data.wall(3, 0, false, wallSide, wallSide),
        ];
    
    map.sectors[2].vertices = [
        data.vertex(1600, 700), // 0
        data.vertex(1900, 1000),// 1
        data.vertex(2000, 1200),// 2
        data.vertex(1900, 1350),// 3
        data.vertex(1500, 1200),// 4
        data.vertex(1400, 800)  // 5
    ];
    
    map.sectors[2].walls = [
        data.wall(0, 1, false, wallSide, wallSide),
        data.wall(1, 2, false, wallSide, wallSide),
        data.wall(2, 3, false, wallSide, wallSide),
        data.wall(3, 4, false, wallSide, wallSide),
        data.wall(4, 5, false, wallSide, wallSide),
        data.wall(5, 0, true, wallSide, wallSide)
    ];
    
    data.maps[0] = map;
    
}());
    
TechEngine.log("Success!");
TechEngine.includeNext();