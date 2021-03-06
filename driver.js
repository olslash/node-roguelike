var log = require('./logs')
var things = require('./things')
var Screen = require('./screen').Screen

var Thing = things.Thing
var Wall = things.Wall
var Box = things.Box
var Dummy = things.Dummy
var Pontobious = things.Pontobious

log('starting log')
var screen = new Screen()
screen.charm.setMaxListeners(0)

var player = new Thing(screen, 6,6,'@')
player.on('collision', function(thing) {
    this.screen.message(thing.desc+' bumps into you.')
}.bind(player))

var move_p = screen.move_thing.bind(screen, player)
screen.key('h', move_p.bind({}, [-1,0]))
screen.key('j', move_p.bind({}, [0,1]))
screen.key('k', move_p.bind({}, [0,-1]))
screen.key('l', move_p.bind({}, [1, 0]))
screen.key('u', move_p.bind({}, [-1, -1]))
screen.key('i', move_p.bind({}, [1, -1]))
screen.key('n', move_p.bind({}, [-1, 1]))
screen.key('m', move_p.bind({}, [1, 1]))
screen.add_player(player)

// make a tunnel
for (var x = 5; x<20; x++) {
    screen.add_thing(new Wall(screen, x, 5))
    screen.add_thing(new Wall(screen, x, 7))
}

// add some items
screen.add_thing(new Box(screen, 21,6))
screen.add_thing(new Dummy(screen, 20,6))
var parchment = new Thing(screen, 20, 14, 'b', 'a tattered parchment')
parchment.on('collision', function() {
    this.screen.dialog(
"Tea leaves thwart those who court catastrophe,"
+"designing futures where nothing will occur:"
+"cross the gypsy’s palm and yawning she"
+"will still predict no perils left to conquer."
+"Jeopardy is jejune now: naïve knight"
+"finds ogres out-of-date and dragons unheard"
+"of, while blasé princesses indict"
+"tilts at terror as downright absurd.")
})
screen.add_thing(parchment)

// add an NPC
var npc = new Pontobious(screen, 10, 10)
screen.add_thing(npc)

screen.key('Space', screen.clear_message.bind(screen))
screen.key('Return', screen.clear_dialog.bind(screen))
screen.start()
npc.start_pacing()
screen.message('welcome to node-roguelike')
