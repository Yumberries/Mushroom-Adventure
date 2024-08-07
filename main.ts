namespace SpriteKind {
    export const Target = SpriteKind.create()
    export const Sword = SpriteKind.create()
    export const Slime = SpriteKind.create()
    export const Wisp = SpriteKind.create()
}
namespace StatusBarKind {
    export const SlimeHealth = StatusBarKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    timer.throttle("slash", 50, function () {
        Use_Sword()
    })
})
statusbars.onStatusReached(StatusBarKind.Health, statusbars.StatusComparison.EQ, statusbars.ComparisonType.Fixed, 6, function (status) {
    spriteutils.setLifeImage(img`
        . . f f f . . . f f f . . 
        . f c c 2 f . f 2 c c f . 
        f c 2 2 2 2 f 2 2 2 2 c f 
        f c 2 2 2 9 9 9 2 2 2 c f 
        f c 2 2 2 9 2 2 2 2 2 c f 
        . f c 2 2 9 9 9 2 2 c f . 
        . . f c 2 9 2 9 2 c f . . 
        . . . f c 9 9 9 c f . . . 
        . . . . f c 2 c f . . . . 
        . . . . . f c f . . . . . 
        . . . . . . f . . . . . . 
        `)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Target, function (sprite, otherSprite) {
    otherSprite.setImage(img`
        . . . . . 4 4 4 4 4 4 . . . . . 
        . . . 4 4 5 5 5 5 5 5 4 4 . . . 
        . . 4 5 5 4 4 4 4 4 4 5 5 4 . . 
        . 4 5 4 4 4 5 5 5 5 4 4 4 5 4 . 
        . 4 5 4 5 5 4 4 4 4 5 5 4 5 4 . 
        4 5 4 4 5 4 4 5 5 4 4 5 4 4 5 4 
        4 5 4 5 4 4 5 4 4 5 4 4 5 4 5 4 
        4 5 4 5 4 5 4 2 2 4 5 4 5 4 5 4 
        4 5 4 5 4 5 4 2 2 4 5 4 5 4 5 4 
        4 5 4 5 4 4 5 4 4 5 4 4 5 4 5 4 
        4 5 4 4 5 4 4 5 5 4 4 5 4 4 5 4 
        . 4 5 4 5 5 4 4 4 4 5 5 4 5 4 . 
        . 4 5 4 4 4 5 5 5 5 4 4 4 5 4 . 
        . . 4 5 5 4 4 4 4 4 4 5 5 4 . . 
        . . . 4 4 5 5 5 5 5 5 4 4 . . . 
        . . . . . 4 4 4 4 4 4 . . . . . 
        `)
})
statusbars.onStatusReached(StatusBarKind.Health, statusbars.StatusComparison.EQ, statusbars.ComparisonType.Fixed, 1, function (status) {
    spriteutils.setLifeImage(img`
        . . f f f . . . f f f . . 
        . f . . . f . f . . . f . 
        f . . 1 . . f . . . . . f 
        f . 1 . . . 9 . . . . . f 
        f . . . . 9 9 . . . . . f 
        . f . . . . 9 . . . . f . 
        . . f . . . 9 . . . f . . 
        . . . f . 9 9 9 . f . . . 
        . . . . f c 2 c f . . . . 
        . . . . . f c f . . . . . 
        . . . . . . f . . . . . . 
        `)
})
scene.onOverlapTile(SpriteKind.Slime, assets.tile`move Left`, function (sprite, location) {
    sprite.setImage(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 8 8 8 8 . . . . . . 
        . . . . 8 8 9 9 9 9 8 8 . . . . 
        . . . 8 9 9 9 9 9 9 9 9 8 . . . 
        . . 8 9 9 9 9 9 9 9 9 9 9 8 . . 
        . 8 9 9 9 9 9 9 9 9 9 9 9 9 8 . 
        . 8 9 9 9 9 9 9 9 9 9 9 9 9 8 . 
        8 6 9 9 9 f 9 9 9 f 9 9 9 9 6 8 
        8 6 9 9 9 f 9 9 9 f 9 9 9 9 6 8 
        8 6 9 9 9 9 9 9 9 9 9 9 9 9 6 8 
        8 6 6 9 9 9 9 9 9 9 9 9 9 9 6 8 
        8 6 6 6 6 9 9 9 9 9 9 9 9 6 6 8 
        . 8 6 6 6 6 6 6 6 6 6 6 6 6 8 . 
        . . 8 8 8 8 8 8 8 8 8 8 8 8 . . 
        `)
    sprite.vx = -40
})
sprites.onOverlap(SpriteKind.Sword, SpriteKind.Slime, function (sprite, otherSprite) {
    timer.throttle("slash", 250, function () {
        statusbars.getStatusBarAttachedTo(StatusBarKind.SlimeHealth, otherSprite).value += -1.5
        if (statusbars.getStatusBarAttachedTo(StatusBarKind.SlimeHealth, otherSprite).value <= 0) {
            sprites.destroy(otherSprite)
            info.changeScoreBy(randint(1, 6))
        }
    })
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile34`, function (sprite, location) {
    timer.throttle("Poke", 750, function () {
        statusbar.value += -1
    })
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Slime, function (sprite, otherSprite) {
    timer.throttle("hit", 750, function () {
        statusbar.value += -1
    })
})
sprites.onOverlap(SpriteKind.Sword, SpriteKind.Target, function (sprite, otherSprite) {
    otherSprite.setImage(img`
        . . . . . 4 4 4 4 4 4 . . . . . 
        . . . 4 4 5 5 5 5 5 5 4 4 . . . 
        . . 4 5 5 4 4 4 4 4 4 5 5 4 . . 
        . 4 5 4 4 4 5 5 5 5 4 4 4 5 4 . 
        . 4 5 4 5 5 4 4 4 4 5 5 4 5 4 . 
        4 5 4 4 5 4 4 5 5 4 4 5 4 4 5 4 
        4 5 4 5 4 4 5 4 4 5 4 4 5 4 5 4 
        4 5 4 5 4 5 4 2 2 4 5 4 5 4 5 4 
        4 5 4 5 4 5 4 2 2 4 5 4 5 4 5 4 
        4 5 4 5 4 4 5 4 4 5 4 4 5 4 5 4 
        4 5 4 4 5 4 4 5 5 4 4 5 4 4 5 4 
        . 4 5 4 5 5 4 4 4 4 5 5 4 5 4 . 
        . 4 5 4 4 4 5 5 5 5 4 4 4 5 4 . 
        . . 4 5 5 4 4 4 4 4 4 5 5 4 . . 
        . . . 4 4 5 5 5 5 5 5 4 4 . . . 
        . . . . . 4 4 4 4 4 4 . . . . . 
        `)
})
statusbars.onStatusReached(StatusBarKind.Health, statusbars.StatusComparison.LTE, statusbars.ComparisonType.Fixed, 0, function (status) {
    spriteutils.setLifeImage(img`
        . . f f f . . . f f f . . 
        . f . . . f . f . . . f . 
        f . . 1 . . f . . . . . f 
        f . 1 . 1 9 9 9 . . . . f 
        f . . . . 9 . 9 . . . . f 
        . f . . . 9 . 9 . . . f . 
        . . f . . 9 . 9 . . f . . 
        . . . f . 9 9 9 . f . . . 
        . . . . f . . . f . . . . 
        . . . . . f . f . . . . . 
        . . . . . . f . . . . . . 
        `)
    pause(100)
    game.setGameOverEffect(false, effects.none)
    game.gameOver(false)
})
function Level_Change () {
    On_Level += 1
    if (On_Level == -1) {
        tiles.setCurrentTilemap(tilemap`Learning_Area`)
        tileUtil.createSpritesOnTiles(assets.tile`myTile11`, img`
            . . . . . d d d d d d . . . . . 
            . . . d d e e e e e e d d . . . 
            . . d e e d d d d d d e e d . . 
            . d e d d d e e e e d d d e d . 
            . d e d e e d d d d e e d e d . 
            d e d d e d d e e d d e d d e d 
            d e d e d d e d d e d d e d e d 
            d e d e d e d 2 2 d e d e d e d 
            d e d e d e d 2 2 d e d e d e d 
            d e d e d d e d d e d d e d e d 
            d e d d e d d e e d d e d d e d 
            . d e d e e d d d d e e d e d . 
            . d e d d d e e e e d d d e d . 
            . . d e e d d d d d d e e d . . 
            . . . d d e e e e e e d d . . . 
            . . . . . d d d d d d . . . . . 
            `, SpriteKind.Target)
        Create_Enemies()
        tiles.placeOnRandomTile(mySprite, assets.tile`myTile33`)
    } else if (On_Level == 0) {
        tiles.setCurrentTilemap(tilemap`level4`)
        Create_Enemies()
        tiles.placeOnRandomTile(mySprite, assets.tile`myTile33`)
    } else if (On_Level == 1) {
        tiles.setCurrentTilemap(tilemap`level7`)
        Create_Enemies()
        tiles.placeOnRandomTile(mySprite, assets.tile`myTile33`)
    } else if (On_Level == 2) {
        tiles.setCurrentTilemap(tilemap`level4`)
        Create_Enemies()
        tiles.placeOnRandomTile(mySprite, assets.tile`myTile33`)
    } else if (On_Level == 3) {
        tiles.setCurrentTilemap(tilemap`level4`)
        Create_Enemies()
        tiles.placeOnRandomTile(mySprite, assets.tile`myTile33`)
    }
}
statusbars.onStatusReached(StatusBarKind.Health, statusbars.StatusComparison.EQ, statusbars.ComparisonType.Fixed, 3, function (status) {
    spriteutils.setLifeImage(img`
        . . f f f . . . f f f . . 
        . f . . . f . f . . . f . 
        f . . 1 . . f . . . . . f 
        f . 1 . . 9 9 9 . . . . f 
        f . . . . . . 9 . . . . f 
        . f . . . 9 9 9 . . . f . 
        . . f c 2 2 2 9 2 c f . . 
        . . . f c 9 9 9 c f . . . 
        . . . . f c 2 c f . . . . 
        . . . . . f c f . . . . . 
        . . . . . . f . . . . . . 
        `)
})
statusbars.onStatusReached(StatusBarKind.Health, statusbars.StatusComparison.EQ, statusbars.ComparisonType.Fixed, 2, function (status) {
    spriteutils.setLifeImage(img`
        . . f f f . . . f f f . . 
        . f . . . f . f . . . f . 
        f . . 1 . . f . . . . . f 
        f . 1 . . 9 9 9 . . . . f 
        f . . . . . . 9 . . . . f 
        . f . . . 9 9 9 . . . f . 
        . . f . . 9 . . . . f . . 
        . . . f c 9 9 9 c f . . . 
        . . . . f c 2 c f . . . . 
        . . . . . f c f . . . . . 
        . . . . . . f . . . . . . 
        `)
})
function Use_Sword () {
    if (Slashing_Direction == 0) {
        Sword = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . b 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . b . . 
            . . . . . . . . . . . . b . . . 
            . . . . . . . . . . b b . . . . 
            . . . . . . . . . b b b . . . . 
            . . . . . . . b b b b . . . . . 
            . . . . . . b b b b . . . . . . 
            . . . . . b b b b b . . . . . . 
            . . . . b b b b b . . . . . . . 
            . . b b b b b b . . . . . . . . 
            . b b b b b b . . . . . . . . . 
            b b b b b b . . . . . . . . . . 
            b b b b b b . . . . . . . . . . 
            b b b b b . . . . . . . . . . . 
            b b b b . . . . . . . . . . . . 
            `, mySprite, 0, 0)
        Sword.setPosition(mySprite.x - 32, mySprite.y)
        Sword.setKind(SpriteKind.Sword)
        animation.runImageAnimation(
        Sword,
        [img`
            . . . . . . . . . . . . . b b b 
            . . . . . . . . . . . . b b b b 
            . . . . . . . . . . . b b b b b 
            . . . . . . . . . b b b b b b . 
            . . . . . . . . b b b b b b . . 
            . . . . . . . b b b b b b . . . 
            . . . . . . . b b b b b b . . . 
            . . . . . . . b b b b b . . . . 
            . . . . . . . b b b b . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . b 
            . . . . . . . . . . . . . b b . 
            . . . . . . . . . . . . b b b . 
            . . . . . . . . . . b b b b . . 
            . . . . . . . . . b b b b . . . 
            . . . . . . . . b b b b b . . . 
            . . . . . . . b b b b b . . . . 
            . . . . . b b b b b b . . . . . 
            . . . . b b b b b b . . . . . . 
            . . . b b b b b b . . . . . . . 
            . . . b b b b b b . . . . . . . 
            . . . b b b b b . . . . . . . . 
            . . . b b b b . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . b 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . b . . 
            . . . . . . . . . . . . b . . . 
            . . . . . . . . . . b b . . . . 
            . . . . . . . . . b b b . . . . 
            . . . . . . . b b b b . . . . . 
            . . . . . . b b b b . . . . . . 
            . . . . . b b b b b . . . . . . 
            . . . . b b b b b . . . . . . . 
            . . b b b b b b . . . . . . . . 
            . b b b b b b . . . . . . . . . 
            b b b b b b . . . . . . . . . . 
            b b b b b b . . . . . . . . . . 
            b b b b b . . . . . . . . . . . 
            b b b b . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . b . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . b . . . . . 
            . . . . . . . . . b . . . . . . 
            . . . . . . . b b . . . . . . . 
            . . . . . . b b b . . . . . . . 
            . . . . b b b b . . . . . . . . 
            . . . b b b b . . . . . . . . . 
            . . b b b b b . . . . . . . . . 
            . b b b b b . . . . . . . . . . 
            b b b b b . . . . . . . . . . . 
            b b b b . . . . . . . . . . . . 
            b b b . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . b . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . b . . . . . . . . . . 
            . . . . b . . . . . . . . . . . 
            . . b b . . . . . . . . . . . . 
            . b b b . . . . . . . . . . . . 
            b b b . . . . . . . . . . . . . 
            b b . . . . . . . . . . . . . . 
            `],
        100,
        false
        )
        pause(200)
        sprites.destroy(Sword)
    } else if (Slashing_Direction == 1) {
        Sword = sprites.createProjectileFromSprite(img`
            b . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . b . . . . . . . . . . . . . 
            . . . b . . . . . . . . . . . . 
            . . . . b b . . . . . . . . . . 
            . . . . b b b . . . . . . . . . 
            . . . . . b b b b . . . . . . . 
            . . . . . . b b b b . . . . . . 
            . . . . . . b b b b b . . . . . 
            . . . . . . . b b b b b . . . . 
            . . . . . . . . b b b b b b . . 
            . . . . . . . . . b b b b b b . 
            . . . . . . . . . . b b b b b . 
            . . . . . . . . . . b b b b b . 
            . . . . . . . . . . . b b b b . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, 0, 0)
        Sword.setPosition(mySprite.x + 32, mySprite.y)
        Sword.setKind(SpriteKind.Sword)
        animation.runImageAnimation(
        Sword,
        [img`
            b b b . . . . . . . . . . . . . 
            b b b b . . . . . . . . . . . . 
            b b b b b . . . . . . . . . . . 
            . b b b b b . . . . . . . . . . 
            . . b b b b b b . . . . . . . . 
            . . . b b b b b b . . . . . . . 
            . . . . b b b b b . . . . . . . 
            . . . . b b b b b . . . . . . . 
            . . . . . b b b b . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            b . . . . . . . . . . . . . . . 
            . b . . . . . . . . . . . . . . 
            . . b b . . . . . . . . . . . . 
            . . b b b . . . . . . . . . . . 
            . . . b b b b . . . . . . . . . 
            . . . . b b b b . . . . . . . . 
            . . . . b b b b b . . . . . . . 
            . . . . . b b b b b . . . . . . 
            . . . . . . b b b b b b . . . . 
            . . . . . . . b b b b b b . . . 
            . . . . . . . . b b b b b . . . 
            . . . . . . . . b b b b b . . . 
            . . . . . . . . . b b b b . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . b . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . b . . . . . . . . . . . . 
            . . . . b . . . . . . . . . . . 
            . . . . . b b . . . . . . . . . 
            . . . . . b b b . . . . . . . . 
            . . . . . . b b b b . . . . . . 
            . . . . . . . b b b b . . . . . 
            . . . . . . . b b b b b . . . . 
            . . . . . . . . b b b b b . . . 
            . . . . . . . . . b b b b b b . 
            . . . . . . . . . . b b b b b b 
            . . . . . . . . . . . b b b b b 
            . . . . . . . . . . . b b b b b 
            . . . . . . . . . . . . b b b b 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . b . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . b . . . . . . . . . 
            . . . . . . . b . . . . . . . . 
            . . . . . . . . b b . . . . . . 
            . . . . . . . . b b b . . . . . 
            . . . . . . . . . b b b b . . . 
            . . . . . . . . . . b b b b . . 
            . . . . . . . . . . b b b b b . 
            . . . . . . . . . . . b b b b b 
            . . . . . . . . . . . . b b b b 
            . . . . . . . . . . . . . b b b 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . b . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . b . . . . 
            . . . . . . . . . . . . b . . . 
            . . . . . . . . . . . . . b b . 
            . . . . . . . . . . . . . b b b 
            . . . . . . . . . . . . . . b b 
            `],
        100,
        false
        )
        pause(200)
        sprites.destroy(Sword)
    } else if (Slashing_Direction == 2) {
        Sword = sprites.createProjectileFromSprite(img`
            .........................
            .........................
            .........................
            ...........bbbbb.........
            ........bbbbbbbbbbb......
            .......bbbbbbbbbbbbb.....
            ......bbbbbbb.bbbbbbb....
            .....bbbb........bbbbbb..
            ....bbb...........bbbbbb.
            ...bb..............bbbbbb
            ..b................bbbbbb
            ....................bbbbb
            b....................bbbb
            .........................
            .........................
            .........................
            `, mySprite, 0, 0)
        Sword.setPosition(mySprite.x, mySprite.y - 32)
        Sword.setKind(SpriteKind.Sword)
        animation.runImageAnimation(
        Sword,
        [img`
            .........................
            .........................
            .........................
            ...........bbbbb.........
            ........bbbbbbbbbbb......
            .......bbbbbbbbbbbbb.....
            ......bbbbbbb.bbbbbbb....
            .....bbbb........bbbbbb..
            ....bbb...........bbbbbb.
            ...bb..............bbbbbb
            ..b................bbbbbb
            ....................bbbbb
            b....................bbbb
            .........................
            .........................
            .........................
            `,img`
            .........................
            .........................
            .........................
            .........................
            ........bbbbbbbbb........
            .......bbbbbbbbbbbbb.....
            ......bb......bbbbbbbb...
            .....b...........bbbbbb..
            ..................bbbbbb.
            ...................bbbbbb
            ....................bbbbb
            .....................bbbb
            ......................bbb
            .......................bb
            .........................
            .........................
            `,img`
            .........................
            .........................
            .........................
            .........................
            .........................
            ..............b.b........
            .................bb......
            ..................bbbb...
            ...................bbbb..
            ....................bbbb.
            .....................bbbb
            ......................bbb
            .......................bb
            .........................
            .........................
            .........................
            `,img`
            .........................
            .........................
            .........................
            .........................
            .........................
            .........................
            .........................
            .........................
            ...................bb....
            .....................bb..
            ......................bbb
            ........................b
            .........................
            .........................
            .........................
            .........................
            `],
        100,
        false
        )
        pause(200)
        sprites.destroy(Sword)
    }
}
function Shoot_Mushroom () {
    if (Shooting_Direction == 0) {
        Mushroom_Rocket = sprites.createProjectileFromSprite(img`
            . . . 2 2 . . . . . . . 
            . . 2 2 2 2 . . . . . . 
            . 2 2 2 1 2 2 . . . . . 
            . 2 2 2 2 2 2 d d d d . 
            2 2 2 2 2 2 2 d f d d d 
            2 1 2 2 2 2 2 d d d d . 
            2 2 2 2 2 1 2 d f d d . 
            2 2 2 2 2 2 2 d d d d d 
            . 2 2 2 2 2 2 d d d d . 
            . 2 1 2 2 2 2 . . . . . 
            . . 2 2 2 2 . . . . . . 
            . . . 2 2 . . . . . . . 
            `, mySprite, -200, 0)
        Mushroom_Rocket.setPosition(mySprite.x - 6, mySprite.y)
        extraEffects.createSpreadEffectOnAnchor(Mushroom_Rocket, extraEffects.createSingleColorSpreadEffectData(2, ExtraEffectPresetShape.Spark), 500, 20)
        extraEffects.createSpreadEffectOnAnchor(Mushroom_Rocket, extraEffects.createSingleColorSpreadEffectData(2, ExtraEffectPresetShape.Spark), 500, 20)
        extraEffects.createSpreadEffectOnAnchor(Mushroom_Rocket, extraEffects.createSingleColorSpreadEffectData(1, ExtraEffectPresetShape.Spark), 500, 20)
    } else if (Shooting_Direction == 1) {
        Mushroom_Rocket = sprites.createProjectileFromSprite(img`
            . . . . . . . 2 2 . . . 
            . . . . . . 2 2 2 2 . . 
            . . . . . 2 2 1 2 2 2 . 
            . d d d d 2 2 2 2 2 2 . 
            d d d f d 2 2 2 2 2 2 2 
            . d d d d 2 2 2 2 2 1 2 
            . d d f d 2 1 2 2 2 2 2 
            d d d d d 2 2 2 2 2 2 2 
            . d d d d 2 2 2 2 2 2 . 
            . . . . . 2 2 2 2 1 2 . 
            . . . . . . 2 2 2 2 . . 
            . . . . . . . 2 2 . . . 
            `, mySprite, 200, 0)
        Mushroom_Rocket.setPosition(mySprite.x + 6, mySprite.y)
        extraEffects.createSpreadEffectOnAnchor(Mushroom_Rocket, extraEffects.createSingleColorSpreadEffectData(2, ExtraEffectPresetShape.Spark), 500, 20)
        extraEffects.createSpreadEffectOnAnchor(Mushroom_Rocket, extraEffects.createSingleColorSpreadEffectData(2, ExtraEffectPresetShape.Spark), 500, 20)
        extraEffects.createSpreadEffectOnAnchor(Mushroom_Rocket, extraEffects.createSingleColorSpreadEffectData(1, ExtraEffectPresetShape.Spark), 500, 20)
    } else if (Shooting_Direction == 2) {
        Mushroom_Rocket = sprites.createProjectileFromSprite(img`
            . . . . 2 2 2 2 . . . . 
            . . 2 2 2 1 2 2 2 2 . . 
            . 2 2 2 2 2 2 2 2 1 2 . 
            2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 1 2 2 2 2 2 2 2 2 2 
            . 2 2 2 2 2 1 2 2 2 2 . 
            . . 2 2 2 2 2 2 2 2 . . 
            . . . d d d d d d . . . 
            . . . d f d f d d . . . 
            . . . d d d d d d . . . 
            . . . d d d d d d . . . 
            . . . . d . . d . . . . 
            `, mySprite, 0, -200)
        Mushroom_Rocket.setPosition(mySprite.x, mySprite.y - 12)
        extraEffects.createSpreadEffectOnAnchor(Mushroom_Rocket, extraEffects.createSingleColorSpreadEffectData(2, ExtraEffectPresetShape.Spark), 500, 20)
        extraEffects.createSpreadEffectOnAnchor(Mushroom_Rocket, extraEffects.createSingleColorSpreadEffectData(2, ExtraEffectPresetShape.Spark), 500, 20)
        extraEffects.createSpreadEffectOnAnchor(Mushroom_Rocket, extraEffects.createSingleColorSpreadEffectData(1, ExtraEffectPresetShape.Spark), 500, 20)
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile66`, function (sprite, location) {
    timer.throttle("Shmack", 750, function () {
        statusbar.value += -1
    })
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    Shooting_Direction = 2
    Slashing_Direction = 2
    RightLeft_image_check()
})
statusbars.onStatusReached(StatusBarKind.Health, statusbars.StatusComparison.EQ, statusbars.ComparisonType.Fixed, 5, function (status) {
    spriteutils.setLifeImage(img`
        . . f f f . . . f f f . . 
        . f . . . f . f . . . f . 
        f . . . . . f . . . . . f 
        f c 2 2 2 9 9 9 2 2 2 c f 
        f c 2 2 2 9 2 2 2 2 2 c f 
        . f c 2 2 9 9 9 2 2 c f . 
        . . f c 2 2 2 9 2 c f . . 
        . . . f c 9 9 9 c f . . . 
        . . . . f c 2 c f . . . . 
        . . . . . f c f . . . . . 
        . . . . . . f . . . . . . 
        `)
})
function RightLeft_image_check () {
    if (Facing_Right == false) {
        mySprite.setImage(img`
            ...........22222222...........
            .......2111122222222222.......
            .....2221111222222222222211...
            ....222221122222222222222211..
            .1222222222222222222222222222.
            111222222222222222112222222222
            111222222222222221111222222222
            112222222222222221111222222222
            222222222222222222112222222222
            222222222222222222222222222222
            222222222222222222222222211222
            222222222222112222222222111122
            222222222221111222222222111122
            222222222221111222222222211222
            222222222222112222222222222222
            ..21111222222222222222222222..
            ....1112222222222222211222cc..
            c.....ddddddddddddddddddccccc.
            cc....ddddddddddddddddddbcccc.
            ccc...ddd1fdddd1fdddddddcbbbb.
            .ccc..dddffddddffdddddddccccc.
            ..cccbdddffddddffddddbddccccc.
            ...cbdddddddddddddbddbddbcccc.
            ...cbddddddddddddddbbdddcbbbb.
            .....bddddddddddddddddddccccc.
            ......dddddddddddddddddd.ccc..
            .......dddddddddddddddd.......
            .......dddddddddddddddd.......
            .......ddddddd..ddddddd.......
            ........ddddd....ddddd........
            `)
    } else if (Facing_Right == true) {
        mySprite.setImage(img`
            ...........22222222...........
            .......2222222222211112.......
            ...112222222222222111122222...
            ..11222222222222222112222222..
            .2222222222222222222222222221.
            222222222211222222222222222111
            222222222111122222222222222111
            222222222111122222222222222211
            222222222211222222222222222222
            222222222222222222222222222222
            222112222222222222222222222222
            221111222222222211222222222222
            221111222222222111122222222222
            222112222222222111122222222222
            222222222222222211222222222222
            ..22222222222222222222211112..
            ..cc2221122222222222222111....
            .cccccdddddddddddddddddd.....c
            .ccccbdddddddddddddddddd....cc
            .bbbbcdddddddf1ddddf1ddd...ccc
            .cccccdddddddffddddffddd..ccc.
            .cccccddbddddffddddffdddbccc..
            .ccccbddbddbdddddddddddddbc...
            .bbbbcdddbbddddddddddddddbc...
            .cccccddddddddddddddddddb.....
            ..ccc.dddddddddddddddddd......
            .......dddddddddddddddd.......
            .......dddddddddddddddd.......
            .......ddddddd..ddddddd.......
            ........ddddd....ddddd........
            `)
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Slime, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    statusbars.getStatusBarAttachedTo(StatusBarKind.SlimeHealth, otherSprite).value += -1
    if (statusbars.getStatusBarAttachedTo(StatusBarKind.SlimeHealth, otherSprite).value <= 0) {
        sprites.destroy(otherSprite)
        info.changeScoreBy(randint(1, 5))
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile62`, function (sprite, location) {
    timer.throttle("Stab", 750, function () {
        statusbar.value += -1
    })
})
statusbars.onStatusReached(StatusBarKind.Health, statusbars.StatusComparison.EQ, statusbars.ComparisonType.Fixed, 4, function (status) {
    spriteutils.setLifeImage(img`
        . . f f f . . . f f f . . 
        . f . . . f . f . . . f . 
        f . . 1 . . f . . . . . f 
        f . 1 . . 9 . 9 . . . . f 
        f c 2 2 2 9 2 9 2 2 2 c f 
        . f c 2 2 9 9 9 2 2 c f . 
        . . f c 2 2 2 9 2 c f . . 
        . . . f c 2 2 9 c f . . . 
        . . . . f c 2 c f . . . . 
        . . . . . f c f . . . . . 
        . . . . . . f . . . . . . 
        `)
})
function Create_Enemies () {
    for (let value of tiles.getTilesByType(assets.tile`myTile40`)) {
        Slime = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 8 8 8 8 . . . . . . 
            . . . . 8 8 9 9 9 9 8 8 . . . . 
            . . . 8 9 9 9 9 9 9 9 9 8 . . . 
            . . 8 9 9 9 9 9 9 9 9 9 9 8 . . 
            . 8 9 9 9 9 9 9 9 9 9 9 9 9 8 . 
            . 8 9 9 9 9 9 9 9 9 9 9 9 9 8 . 
            8 6 9 9 9 9 f 9 9 9 f 9 9 9 6 8 
            8 6 9 9 9 9 f 9 9 9 f 9 9 9 6 8 
            8 6 9 9 9 9 9 9 9 9 9 9 9 9 6 8 
            8 6 6 9 9 9 9 9 9 9 9 9 9 9 6 8 
            8 6 6 6 6 9 9 9 9 9 9 9 9 6 6 8 
            . 8 6 6 6 6 6 6 6 6 6 6 6 6 8 . 
            . . 8 8 8 8 8 8 8 8 8 8 8 8 . . 
            `, SpriteKind.Slime)
        tiles.placeOnTile(Slime, value)
        Slime.vx = 40
        tiles.setTileAt(value, assets.tile`myTile0`)
        Slime_Health = statusbars.create(20, 4, StatusBarKind.SlimeHealth)
        Slime_Health.max = 4
        Slime_Health.value = 4
        Slime_Health.attachToSprite(Slime)
        Slime_Health.setColor(2, 14, 4)
        Slime_Health.setBarBorder(1, 15)
        Slime_Health.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile41`)) {
        Wisp = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . f f 6 6 6 6 f f . . . . 
            . . . f 6 9 9 9 9 9 9 6 f . . . 
            . . f 6 9 1 1 1 1 1 1 9 6 f . . 
            . . f 9 1 1 1 1 1 1 1 1 9 f . . 
            . f 6 9 1 1 1 1 1 1 1 1 9 6 f . 
            . f 6 9 1 1 f 1 1 1 f 1 9 6 f . 
            . f 6 9 1 1 f 1 1 1 f 1 9 6 f . 
            . f 6 9 1 1 1 1 1 1 1 1 9 6 f . 
            . . f 9 1 1 1 1 1 1 1 1 9 f . . 
            . . f 6 9 1 1 1 1 1 1 9 6 f . . 
            . . . f 6 9 9 9 9 9 9 6 f . . . 
            . . . . f f 6 6 6 6 f f . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Wisp)
        tiles.placeOnTile(Wisp, value)
        tiles.setTileAt(value, assets.tile`myTile0`)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    timer.throttle("Shoot", 250, function () {
        Shoot_Mushroom()
    })
})
scene.onOverlapTile(SpriteKind.Slime, assets.tile`Move Right`, function (sprite, location) {
    sprite.setImage(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 8 8 8 8 . . . . . . 
        . . . . 8 8 9 9 9 9 8 8 . . . . 
        . . . 8 9 9 9 9 9 9 9 9 8 . . . 
        . . 8 9 9 9 9 9 9 9 9 9 9 8 . . 
        . 8 9 9 9 9 9 9 9 9 9 9 9 9 8 . 
        . 8 9 9 9 9 9 9 9 9 9 9 9 9 8 . 
        8 6 9 9 9 9 f 9 9 9 f 9 9 9 6 8 
        8 6 9 9 9 9 f 9 9 9 f 9 9 9 6 8 
        8 6 9 9 9 9 9 9 9 9 9 9 9 9 6 8 
        8 6 6 9 9 9 9 9 9 9 9 9 9 9 6 8 
        8 6 6 6 6 9 9 9 9 9 9 9 9 6 6 8 
        . 8 6 6 6 6 6 6 6 6 6 6 6 6 8 . 
        . . 8 8 8 8 8 8 8 8 8 8 8 8 . . 
        `)
    sprite.vx = 40
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile35`, function (sprite, location) {
    Level_Change()
})
let Wisp: Sprite = null
let Slime_Health: StatusBarSprite = null
let Slime: Sprite = null
let Facing_Right = false
let Mushroom_Rocket: Sprite = null
let Sword: Sprite = null
let statusbar: StatusBarSprite = null
let Slashing_Direction = 0
let Shooting_Direction = 0
let mySprite: platformer.PlatformerSprite = null
let On_Level = 0
On_Level = 0
mySprite = platformer.create(img`
    ...........22222222...........
    .......2222222222211112.......
    ...112222222222222111122222...
    ..11222222222222222112222222..
    .2222222222222222222222222221.
    222222222211222222222222222111
    222222222111122222222222222111
    222222222111122222222222222211
    222222222211222222222222222222
    222222222222222222222222222222
    222112222222222222222222222222
    221111222222222211222222222222
    221111222222222111122222222222
    222112222222222111122222222222
    222222222222222211222222222222
    ..22222222222222222222211112..
    ..cc2221122222222222222111....
    .cccccdddddddddddddddddd.....c
    .ccccbdddddddddddddddddd....cc
    .bbbbcdddddddf1ddddf1ddd...ccc
    .cccccdddddddffddddffddd..ccc.
    .cccccddbddddffddddffdddbccc..
    .ccccbddbddbdddddddddddddbc...
    .bbbbcdddbbddddddddddddddbc...
    .cccccddddddddddddddddddb.....
    ..ccc.dddddddddddddddddd......
    .......dddddddddddddddd.......
    .......dddddddddddddddd.......
    .......ddddddd..ddddddd.......
    ........ddddd....ddddd........
    `, SpriteKind.Player)
scene.cameraFollowSprite(mySprite)
platformer.setFeatureEnabled(platformer.PlatformerFeatures.JumpOnUpPressed, true)
platformer.setFeatureEnabled(platformer.PlatformerFeatures.JumpOnAPressed, false)
platformer.setFeatureEnabled(platformer.PlatformerFeatures.AllowJumpCancellation, true)
platformer.setFeatureEnabled(platformer.PlatformerFeatures.WallJumps, true)
platformer.setGravity(500)
platformer.moveSprite(mySprite, true, 100)
let Is_Jumping = false
let Is_Double_Jumping = false
Shooting_Direction = 1
Slashing_Direction = 1
info.setLife(1)
statusbar = statusbars.create(1, 1, StatusBarKind.Health)
statusbar.attachToSprite(mySprite)
statusbar.value = 6
statusbar.value = 6
Level_Change()
game.onUpdate(function () {
    if (mySprite.image.equals(img`
        ...........22222222...........
        .....2221111222222222222211...
        ....222221122222222222222211..
        .1222222222222222222222222222.
        111222222222222222112222222222
        111222222222222221111222222222
        112222222222222221111222222222
        222222222222222222112222222222
        222222222222222222222222222222
        222222222222222222222222211222
        222222222222112222222222111122
        222222222221111222222222111122
        222222222221111222222222211222
        222222222222112222222222222222
        ..21111222222222222222222222..
        ....1112222222222222211222....
        `)) {
        mySprite.setVelocity(-150, 100)
    } else if (mySprite.image.equals(img`
        ...........22222222...........
        ...112222222222222111122222...
        ..11222222222222222112222222..
        .2222222222222222222222222221.
        222222222211222222222222222111
        222222222111122222222222222111
        222222222111122222222222222211
        222222222211222222222222222222
        222222222222222222222222222222
        222112222222222222222222222222
        221111222222222211222222222222
        221111222222222111122222222222
        222112222222222111122222222222
        222222222222222211222222222222
        ..22222222222222222222211112..
        ....2221122222222222222111....
        `)) {
        mySprite.setVelocity(150, 100)
    }
})
game.onUpdateInterval(50, function () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        Is_Jumping = false
        Is_Double_Jumping = false
    }
})
game.onUpdateInterval(50, function () {
    if (controller.left.isPressed() && controller.down.isPressed() == false) {
        Facing_Right = false
        RightLeft_image_check()
        Shooting_Direction = 0
        Slashing_Direction = 0
    } else if (controller.right.isPressed() && controller.down.isPressed() == false) {
        Facing_Right = true
        RightLeft_image_check()
        Shooting_Direction = 1
        Slashing_Direction = 1
    } else if (controller.down.isPressed()) {
        if (mySprite.image.equals(img`
            ...........22222222...........
            .......2111122222222222.......
            .....2221111222222222222211...
            ....222221122222222222222211..
            .1222222222222222222222222222.
            111222222222222222112222222222
            111222222222222221111222222222
            112222222222222221111222222222
            222222222222222222112222222222
            222222222222222222222222222222
            222222222222222222222222211222
            222222222222112222222222111122
            222222222221111222222222111122
            222222222221111222222222211222
            222222222222112222222222222222
            ..21111222222222222222222222..
            ....1112222222222222211222cc..
            c.....ddddddddddddddddddccccc.
            cc....ddddddddddddddddddbcccc.
            ccc...ddd1fdddd1fdddddddcbbbb.
            .ccc..dddffddddffdddddddccccc.
            ..cccbdddffddddffddddbddccccc.
            ...cbdddddddddddddbddbddbcccc.
            ...cbddddddddddddddbbdddcbbbb.
            .....bddddddddddddddddddccccc.
            ......dddddddddddddddddd.ccc..
            .......dddddddddddddddd.......
            .......dddddddddddddddd.......
            .......ddddddd..ddddddd.......
            ........ddddd....ddddd........
            `)) {
            mySprite.setImage(img`
                ...........22222222...........
                .....2221111222222222222211...
                ....222221122222222222222211..
                .1222222222222222222222222222.
                111222222222222222112222222222
                111222222222222221111222222222
                112222222222222221111222222222
                222222222222222222112222222222
                222222222222222222222222222222
                222222222222222222222222211222
                222222222222112222222222111122
                222222222221111222222222111122
                222222222221111222222222211222
                222222222222112222222222222222
                ..21111222222222222222222222..
                ....1112222222222222211222....
                `)
        } else if (mySprite.image.equals(img`
            ...........22222222...........
            .......2222222222211112.......
            ...112222222222222111122222...
            ..11222222222222222112222222..
            .2222222222222222222222222221.
            222222222211222222222222222111
            222222222111122222222222222111
            222222222111122222222222222211
            222222222211222222222222222222
            222222222222222222222222222222
            222112222222222222222222222222
            221111222222222211222222222222
            221111222222222111122222222222
            222112222222222111122222222222
            222222222222222211222222222222
            ..22222222222222222222211112..
            ..cc2221122222222222222111....
            .cccccdddddddddddddddddd.....c
            .ccccbdddddddddddddddddd....cc
            .bbbbcdddddddf1ddddf1ddd...ccc
            .cccccdddddddffddddffddd..ccc.
            .cccccddbddddffddddffdddbccc..
            .ccccbddbddbdddddddddddddbc...
            .bbbbcdddbbddddddddddddddbc...
            .cccccddddddddddddddddddb.....
            ..ccc.dddddddddddddddddd......
            .......dddddddddddddddd.......
            .......dddddddddddddddd.......
            .......ddddddd..ddddddd.......
            ........ddddd....ddddd........
            `)) {
            mySprite.setImage(img`
                ...........22222222...........
                ...112222222222222111122222...
                ..11222222222222222112222222..
                .2222222222222222222222222221.
                222222222211222222222222222111
                222222222111122222222222222111
                222222222111122222222222222211
                222222222211222222222222222222
                222222222222222222222222222222
                222112222222222222222222222222
                221111222222222211222222222222
                221111222222222111122222222222
                222112222222222111122222222222
                222222222222222211222222222222
                ..22222222222222222222211112..
                ....2221122222222222222111....
                `)
        } else if (controller.down.isPressed() == false) {
            RightLeft_image_check()
        }
    }
})
